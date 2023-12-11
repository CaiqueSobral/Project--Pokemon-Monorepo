export interface HabitatInterface {
  id: number;
  name: string;
  color: string;
  sprite: {
    main: string;
    ground: string;
    bg: string;
  };
  coords: {
    lat: number;
    lng: number;
  };
  habitatWeather?: {
    tempC: number;
    icon: string;
  };
}
