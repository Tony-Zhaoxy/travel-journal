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

export type TravelDetailSection = {
  slug: string;
  name: string;
  englishName: string;
  city: string;
  year: string;
  mapPosition: MapPosition;
  accent: string;
  description: string;
  places: string[];
  gallery: string[];
};

export type TravelEntry = {
  slug: string;
  name: string;
  englishName: string;
  region: string;
  city: string;
  year: string;
  visitSummary: string;
  airportOnly?: boolean;
  showInStoryList?: boolean;
  showOnWorldMap?: boolean;
  mapTargetSlug?: string;
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
  detailSections?: TravelDetailSection[];
};
