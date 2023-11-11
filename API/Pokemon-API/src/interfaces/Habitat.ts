export interface HabitatInterface {
  name: string;
  sprite: {
    main: string;
    ground: string;
    bg: string;
  };
  id: number;
  habitatWeather: {
    tempC: string;
    icon: string;
  };
}
