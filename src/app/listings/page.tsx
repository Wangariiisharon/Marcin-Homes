import { getListings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ListingsClient from "./ListingsClient";

export default async function ListingsPage() {
  const sanityListings = (await getListings()) ?? [];

  const listings = sanityListings.map((listing) => ({
    title: listing.title ?? "Untitled listing",
    location: listing.location ?? "",
    price: listing.price ?? "",
    status: listing.status ?? "",
    beds: listing.beds ?? 0,
    baths: listing.baths ?? 0,
    sqft: parseInt(listing.sqft ?? "0", 10), // Convert string to number
    img: urlFor(listing.image) ?? "",
    gallery:
      listing.gallery
        ?.map((g) => (g ? urlFor(g) : null))
        .filter((url): url is string => !!url) ?? [],
    description: listing.description ?? "",
  }));

  return <ListingsClient listings={listings} />;
  
}