import { getServices } from "@/sanity/lib/queries";
import ServicesClient from "./servicesClient";

export default async function ServicesPage() {
  const services = (await getServices()) ?? [];

  return <ServicesClient services={services} />;
}
