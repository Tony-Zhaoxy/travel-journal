export type TravelCoordinates = {
  lat: number;
  lng: number;
};

export type TravelEntry = {
  slug: string;
  name: string;
  region: string;
  visitedYear: string;
  coordinates: TravelCoordinates;
  memory: string;
  coverImage: string;
  accent: string;
  route: string;
  highlights: string[];
  gallery: string[];
  story: string;
};
