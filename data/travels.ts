import type { TravelEntry } from "@/types/travel";

const imageParams = "?auto=format&fit=crop&w=1600&q=80";

export const travels: TravelEntry[] = [
  {
    slug: "japan",
    name: "Japan",
    region: "East Asia",
    visitedYear: "2017",
    coordinates: { lat: 36.2048, lng: 138.2529 },
    memory: "Blue hour in Tokyo felt precise and weightless, with tiny restaurants glowing like lanterns after rain.",
    coverImage: `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf${imageParams}`,
    accent: "#d56a52",
    route: "Tokyo to Kyoto",
    highlights: ["Tokyo nights", "Kyoto temples", "station bento"],
    gallery: [
      "Neon reflections near Shinjuku",
      "A quiet morning shrine path",
      "Steam rising from a noodle counter"
    ],
    story:
      "A placeholder story for Japan: edit this into a sequence of photographs, weather, meals, and the small private details that made the trip feel alive."
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Southern Europe",
    visitedYear: "2018",
    coordinates: { lat: 41.8719, lng: 12.5674 },
    memory: "Late sun washed the stone streets in honey, and every corner seemed to hold a slower version of time.",
    coverImage: `https://images.unsplash.com/photo-1523906834658-6e24ef2386f9${imageParams}`,
    accent: "#c89145",
    route: "Venice to Florence",
    highlights: ["canal light", "museum afternoons", "espresso at the bar"],
    gallery: [
      "Reflections under a canal bridge",
      "Tuscan rooftops in evening light",
      "A marble stairwell after closing"
    ],
    story:
      "A placeholder story for Italy: replace this with notes about the route, favorite frames, and the mood that tied the photographs together."
  },
  {
    slug: "france",
    name: "France",
    region: "Western Europe",
    visitedYear: "2019",
    coordinates: { lat: 46.2276, lng: 2.2137 },
    memory: "Paris mornings were soft and silver, with cafe chairs turned toward the street like a theater.",
    coverImage: `https://images.unsplash.com/photo-1502602898657-3e91760cbb34${imageParams}`,
    accent: "#8aa3b8",
    route: "Paris and the Seine",
    highlights: ["river walks", "old bookstalls", "window light"],
    gallery: [
      "A bridge silhouette at dawn",
      "Tables set before lunch",
      "Museum glass and winter coats"
    ],
    story:
      "A placeholder story for France: add the personal arc, favorite neighborhoods, and the photographs that still feel unfinished."
  },
  {
    slug: "iceland",
    name: "Iceland",
    region: "North Atlantic",
    visitedYear: "2019",
    coordinates: { lat: 64.9631, lng: -19.0208 },
    memory: "The landscape felt newly made, all black sand, mineral wind, and sudden waterfalls folding out of the hills.",
    coverImage: `https://images.unsplash.com/photo-1504829857797-ddff29c27927${imageParams}`,
    accent: "#7fb4ad",
    route: "South Coast road trip",
    highlights: ["black sand", "waterfall mist", "long empty roads"],
    gallery: [
      "A cliff line through low cloud",
      "Rain on the windshield",
      "A small figure under a waterfall"
    ],
    story:
      "A placeholder story for Iceland: describe the drive, weather, and the images where scale became the main subject."
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "North Africa",
    visitedYear: "2020",
    coordinates: { lat: 31.7917, lng: -7.0926 },
    memory: "Marrakesh moved in layers: spice, motorbikes, call to prayer, and courtyards where the city suddenly went quiet.",
    coverImage: `https://images.unsplash.com/photo-1518548419970-58e3b4079ab2${imageParams}`,
    accent: "#d08b5b",
    route: "Marrakesh to the Atlas",
    highlights: ["market color", "courtyard shade", "desert roads"],
    gallery: [
      "Tiles around a hidden doorway",
      "Dust on a mountain pass",
      "A courtyard pool at noon"
    ],
    story:
      "A placeholder story for Morocco: make room for texture, sound, and the moments when the city opened into stillness."
  },
  {
    slug: "thailand",
    name: "Thailand",
    region: "Southeast Asia",
    visitedYear: "2021",
    coordinates: { lat: 15.87, lng: 100.9925 },
    memory: "The evenings were warm and electric, with street food smoke drifting through gold light.",
    coverImage: `https://images.unsplash.com/photo-1508009603885-50cf7c579365${imageParams}`,
    accent: "#e0a64f",
    route: "Bangkok to Chiang Mai",
    highlights: ["night markets", "temple gold", "mountain air"],
    gallery: [
      "Scooters threading through traffic",
      "Temple bells in the heat",
      "A table full of shared plates"
    ],
    story:
      "A placeholder story for Thailand: swap in memories from markets, temples, and the photographs that caught the rhythm of the trip."
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "Southeast Asia",
    visitedYear: "2021",
    coordinates: { lat: 14.0583, lng: 108.2772 },
    memory: "Morning coffee, misty water, and the sound of scooters became the trip's quiet metronome.",
    coverImage: `https://images.unsplash.com/photo-1528127269322-539801943592${imageParams}`,
    accent: "#7f9f68",
    route: "Hanoi to Ha Long Bay",
    highlights: ["egg coffee", "limestone islands", "old quarter alleys"],
    gallery: [
      "Boats moving through pale water",
      "A cafe balcony above the street",
      "Laundry and cables in afternoon sun"
    ],
    story:
      "A placeholder story for Vietnam: add the route, the meals, and the tiny scenes that made ordinary moments cinematic."
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    region: "Oceania",
    visitedYear: "2022",
    coordinates: { lat: -40.9006, lng: 174.886 },
    memory: "Every road felt like it had been drawn toward a horizon of water, mountain, and weather.",
    coverImage: `https://images.unsplash.com/photo-1469474968028-56623f02e42e${imageParams}`,
    accent: "#6f9aa6",
    route: "South Island loop",
    highlights: ["alpine roads", "glacial lakes", "wide weather"],
    gallery: [
      "A lake holding the sky",
      "Roadside grass in hard wind",
      "Mountains before a storm"
    ],
    story:
      "A placeholder story for New Zealand: turn this into a road journal with distances, stops, and the landscape frames that surprised you."
  },
  {
    slug: "peru",
    name: "Peru",
    region: "South America",
    visitedYear: "2022",
    coordinates: { lat: -9.19, lng: -75.0152 },
    memory: "Altitude made everything slow down, and the mountains seemed to hold their own private weather.",
    coverImage: `https://images.unsplash.com/photo-1526392060635-9d6019884377${imageParams}`,
    accent: "#b66d57",
    route: "Cusco and the Sacred Valley",
    highlights: ["stone terraces", "thin air", "market mornings"],
    gallery: [
      "Clouds breaking over old stone",
      "Textiles stacked in a market",
      "A train window above the river"
    ],
    story:
      "A placeholder story for Peru: write through the altitude, the approach, and the feeling of seeing ancient stone in changing light."
  },
  {
    slug: "mexico",
    name: "Mexico",
    region: "North America",
    visitedYear: "2023",
    coordinates: { lat: 23.6345, lng: -102.5528 },
    memory: "The color stayed with me: painted walls, market flowers, and late afternoon shadows on old stone.",
    coverImage: `https://images.unsplash.com/photo-1512813195386-6cf811ad3542${imageParams}`,
    accent: "#d05f4b",
    route: "Mexico City to Oaxaca",
    highlights: ["street murals", "market flowers", "slow courtyards"],
    gallery: [
      "A wall painted in afternoon sun",
      "Tortillas pressed by hand",
      "A plaza after rain"
    ],
    story:
      "A placeholder story for Mexico: add the meals, streets, faces, and the frames where color carried the whole memory."
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    visitedYear: "2023",
    coordinates: { lat: 56.1304, lng: -106.3468 },
    memory: "The distances were generous, and the lake light had a clean, northern patience.",
    coverImage: `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee${imageParams}`,
    accent: "#6c9fa0",
    route: "Vancouver and the Rockies",
    highlights: ["coastal rain", "mountain lakes", "forest trails"],
    gallery: [
      "Pines disappearing into fog",
      "A ferry wake at dusk",
      "Glacial water under cloud"
    ],
    story:
      "A placeholder story for Canada: add the hikes, ferry rides, weather shifts, and images that gave the trip its scale."
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Northern Europe",
    visitedYear: "2024",
    coordinates: { lat: 55.3781, lng: -3.436 },
    memory: "London moved between old brick and new glass, rainy reflections and warm windows after dark.",
    coverImage: `https://images.unsplash.com/photo-1513635269975-59663e0ac1ad${imageParams}`,
    accent: "#9a8f78",
    route: "London and the coast",
    highlights: ["rainy streets", "museum rooms", "coastal wind"],
    gallery: [
      "A bus passing through rain",
      "Brick lanes before dinner",
      "Grey sea and white cliffs"
    ],
    story:
      "A placeholder story for the United Kingdom: use this for city notes, train rides, and the small interiors that held the best light."
  },
  {
    slug: "turkey",
    name: "Turkey",
    region: "Anatolia",
    visitedYear: "2024",
    coordinates: { lat: 38.9637, lng: 35.2433 },
    memory: "Cappadocia at sunrise felt unreal, all quiet balloons and stone valleys turning rose-colored.",
    coverImage: `https://images.unsplash.com/photo-1524231757912-21f4fe3a7200${imageParams}`,
    accent: "#cf8360",
    route: "Istanbul to Cappadocia",
    highlights: ["ferry crossings", "stone valleys", "sunrise balloons"],
    gallery: [
      "Tea glasses catching ferry light",
      "Balloons over pale stone",
      "A mosque courtyard at blue hour"
    ],
    story:
      "A placeholder story for Turkey: add the contrast between city water, ancient stone, and the quiet before sunrise."
  },
  {
    slug: "hong-kong",
    name: "Hong Kong",
    region: "East Asia",
    visitedYear: "2025",
    coordinates: { lat: 22.3193, lng: 114.1694 },
    memory: "The city stacked itself upward in light, glass, tram wires, and harbor haze.",
    coverImage: `https://images.unsplash.com/photo-1536599018102-9f803c140fc1${imageParams}`,
    accent: "#7c8fc7",
    route: "Harbor, trams, and hills",
    highlights: ["harbor haze", "tram rides", "vertical streets"],
    gallery: [
      "Neon layered over wet pavement",
      "A ferry crossing in late haze",
      "Apartment windows climbing a hill"
    ],
    story:
      "A placeholder story for Hong Kong: write toward density, motion, and the compressed beauty of the skyline at night."
  }
];
