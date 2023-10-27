import React, { useContext } from 'react';
import { ImageBackground, View } from 'react-native';
import PrimaryText from '../Custom/PrimaryText';
import Custom8BitBorders from '../Custom/Custom8BitBorders';
import { PokemonsContext } from '../../data/context/pokemonsContext';
import { HabitatsColors } from '../../data/constants';

type Props = {
  habitat: string;
  color: string;
};

export default function HabitatComponent(props: Props) {
  const { habitats } = useContext(PokemonsContext);
  const actualHabitat =
    props.habitat.toLowerCase() != 'rare'
      ? habitats.filter(
          (habitat) =>
            habitat.name.toLowerCase() === props.habitat.toLowerCase(),
        )[0].sprite
      : null;

  const getColor = () => {
    let key: keyof typeof HabitatsColors;
    for (key in HabitatsColors) {
      if (key === props.habitat.toLowerCase()) {
        return HabitatsColors[key];
      }
    }
  };

  console.log(getColor());
  return (
    <View className="flex-1 w-[90%] justify-between -mb">
      <View className="flex-1 justify-center items-center">
        <View
          className="flex w-4/5 h-full items-center justify-center border-2"
          style={{ backgroundColor: !actualHabitat ? '#eee' : 'transparent' }}
        >
          {actualHabitat && (
            <ImageBackground
              source={{ uri: actualHabitat }}
              resizeMode="cover"
              className="absolute w-full h-full opacity-90"
            />
          )}
          {!actualHabitat && (
            <PrimaryText text="?" classname="text-4xl text-center pt-4" />
          )}

          <PrimaryText
            style={{ backgroundColor: actualHabitat ? getColor() : '#aaa' }}
            text={`Habitat: ${actualHabitat ? props.habitat : '???'}`}
            classname="absolute top-0 left-0 text-[8px] pt-[4] text-white px-1 border-r border-b"
          />
          <Custom8BitBorders />
        </View>
      </View>
    </View>
  );
}
