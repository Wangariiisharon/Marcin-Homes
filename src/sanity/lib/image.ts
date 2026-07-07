import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: unknown) {
  return typeof source === "undefined" || source === null
    ? null
    : builder.image(source).auto("format").fit("max").url();
}
