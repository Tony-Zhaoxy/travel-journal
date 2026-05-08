import { travels } from "@/data/travels";

export function getAllTravels() {
  return travels;
}

export function getTravelBySlug(slug: string) {
  return travels.find((travel) => travel.slug === slug);
}

export function getAdjacentTravels(slug: string) {
  const index = travels.findIndex((travel) => travel.slug === slug);

  return {
    previous: index > 0 ? travels[index - 1] : travels[travels.length - 1],
    next: index >= 0 && index < travels.length - 1 ? travels[index + 1] : travels[0]
  };
}
