import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Strips inline HTML tags (e.g. the `<span class="amber">` emphasis markup
 * used in translation strings) down to plain text, for contexts like
 * TextRevealByWord that only accept a plain string. */
export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "")
}
