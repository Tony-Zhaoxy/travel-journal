export type TravelCoordinates = {
  lat: number;
  lng: number;
};

export type MapOffset = {
  x: number;
  y: number;
};

export type MapPosition = {
  x: number;
  y: number;
};

export type TravelEntry = {
  slug: string;
  name: string;
  englishName: string;
  region: string;
  city: string;
  year: string;
  visitSummary: string;
  visitCount?: number;
  airportOnly?: boolean;
  coordinates: TravelCoordinates;
  mapPosition?: MapPosition;
  mapOffset?: MapOffset;
  memory: string;
  coverImage: string;
  accent: string;
  route: string;
  places: string[];
  highlights: string[];
  gallery: string[];
  story: string;
};
