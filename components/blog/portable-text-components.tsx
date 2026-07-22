import Image from "next/image";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <span style={{ display: "block", position: "relative", aspectRatio: "16/9" }}>
          <Image
            src={urlFor(value).width(1200).fit("max").auto("format").url()}
            alt={value.alt ?? ""}
            fill
            sizes="(max-width: 820px) 100vw, 760px"
            style={{ objectFit: "cover", borderRadius: "14px" }}
          />
        </span>
      );
    },
  },
};
