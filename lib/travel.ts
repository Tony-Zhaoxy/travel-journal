import { travels } from "@/data/travels";

export function getAllTravels() {
  return travels;
}

export function getMapTravels() {
  return travels.filter((travel) => travel.showOnWorldMap !== false);
}

export function getStoryTravels() {
  return travels.filter((travel) => travel.showInStoryList !== false);
}

export function getTravelBySlug(slug: string) {
  return getStoryTravels().find((travel) => travel.slug === slug);
}

export function getAdjacentTravels(slug: string) {
  const storyTravels = getStoryTravels();
  const index = storyTravels.findIndex((travel) => travel.slug === slug);

  return {
    previous: index > 0 ? storyTravels[index - 1] : storyTravels[storyTravels.length - 1],
    next: index >= 0 && index < storyTravels.length - 1 ? storyTravels[index + 1] : storyTravels[0]
  };
}
