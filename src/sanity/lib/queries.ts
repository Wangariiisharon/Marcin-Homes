import { sanityFetch } from "./client";

export async function getListings() {
  return sanityFetch<
    Array<{
      _id: string;
      title?: string;
      location?: string;
      price?: string;
      status?: string;
      beds?: number;
      baths?: number;
      sqft?: string;
      slug?: { current?: string };
      image?: { asset?: { _ref?: string }; alt?: string };
      gallery?: Array<{ asset?: { _ref?: string }; alt?: string }>;
      description?: string;
    }>
  >(
    `*[_type == "listing"] | order(_createdAt desc) {
      _id,
      title,
      location,
      price,
      status,
      beds,
      baths,
      sqft,
      slug,
      image,
      gallery,
      description

    }`,
  );
}

export async function getServices() {
  return sanityFetch<
    Array<{
      _id: string;
      title?: string;
      icon?: string;
      blurb?: string;
      items?: string[];
      order?: number;
    }>
  >(
    `*[_type == "service"] | order(order asc) {
      _id,
      title,
      icon,
      blurb,
      items,
      order
    }`,
  );
}

export async function getPropertyManagementPage() {
  return sanityFetch<{
    _id: string;
    headline?: string;
    intro?: string;
    pillars?: Array<{ title?: string; description?: string }>;
    steps?: Array<{ title?: string; description?: string }>;
    ctaLabel?: string;
    ctaHref?: string;
  } | null>(
    `*[_type == "propertyManagementPage"][0]{
      _id,
      headline,
      intro,
      pillars,
      steps,
      ctaLabel,
      ctaHref
    }`,
  );
}
