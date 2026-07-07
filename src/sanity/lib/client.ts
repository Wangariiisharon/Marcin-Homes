import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
});

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>) {
  try {
    return (await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: 60 },
    })) as T;
  } catch {
    return undefined as T;
  }
}
