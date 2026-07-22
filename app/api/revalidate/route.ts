import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextRequest, NextResponse } from "next/server";

interface WebhookPayload {
  _type: string;
  slug?: { current: string };
}

// Configured as a webhook in Sanity's dashboard (manage.sanity.io → project
// → API → Webhooks), pointed at this route, firing on create/update/delete
// of `post` documents. This is what makes publishing "quase instantâneo"
// instead of waiting on a timed revalidation.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true // wait for Content Lake eventual consistency before revalidating
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    // One shared tag, not per-slug: this also self-heals a slug rename —
    // the *old* URL's cached fetch is tagged "post" too, so it gets
    // invalidated on the same webhook fire and correctly starts 404ing
    // instead of serving stale content indefinitely.
    //
    // { expire: 0 } (not the "max" profile) is deliberate: "max" gives
    // stale-while-revalidate semantics (the *next* visit still gets stale
    // content while fresh data loads in the background) — for a webhook
    // that's supposed to make publishing feel instant, we want the very
    // next request to get fresh data, not the one after.
    revalidateTag("post", { expire: 0 });
    revalidatePath("/blog");
    if (body.slug?.current) revalidatePath(`/${body.slug.current}`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("[revalidate] failed", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
