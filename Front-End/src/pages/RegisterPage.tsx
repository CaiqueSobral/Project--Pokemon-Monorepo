import { RegisterPageScreenProps } from '@/routes/HomeNavigator';
import React, { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryTextInput from '../components/Custom/PrimaryTextInput';
import PrimaryText from '../components/Custom/PrimaryText';
import BackHeader from '../components/Header/BackHeader';
import PrimaryButton from '../components/Custom/PrimaryButton';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import CustomModal from '../components/Custom/CustomModal';
import { createUser } from '../firebase/firebaseAuth';
import { createUserStore } from '../firebase/firebaseStore';

export default function RegisterPage({ navigation }: RegisterPageScreenProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [selection, setSelection] = useState<0 | 1>(0);
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [showModal, setShowModal] = useState<{ show: boolean; text: string }>({
    show: false,
    text: '',
  });

  const isEmptyStrings = (): boolean => {
    if (
      !name.replaceAll(' ', '') ||
      !email.replaceAll(' ', '') ||
      !pass.replaceAll(' ', '') ||
      !confirmPass.replaceAll(' ', '')
    ) {
      setShowModal({ show: true, text: 'All fields are needed.' });
      return false;
    }

    return true;
  };

  const checkPass = (): boolean => {
    if (pass !== confirmPass) {
      setShowModal({ show: true, text: 'Your passwords must match.' });
      return false;
    }
    return true;
  };

  const hideModal = () => {
    setShowModal({ show: false, text: '' });
  };

  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -offset.value }],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(
      withSpring(8, { duration: 250, dampingRatio: 1, stiffness: 500 }),
      -1,
      true,
    );

    return () => {};
  }, []);

  const images = [
    '../../assets/images/profile/female-high.png',
    '../../assets/images/profile/male-high.png',
  ];

  const renderLabel = (
    labelText: string,
    text: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    ispassword?: true | undefined,
  ) => {
    return (
      <View className="w-11/12 my-4">
        <PrimaryText
          text={labelText}
          classname="text-left w-11/12 self-center mb-2"
        />
        <PrimaryTextInput
          setText={setState}
          value={text}
          password={ispassword}
        />
      </View>
    );
  };

  const confirmRegistration = async () => {
    try {
      const { user } = await createUser(email, pass);
      await createUserStore(
        user.uid,
        name,
        email,
        selection === 0 ? 'female' : 'male',
      );
      setShowModal({ show: true, text: 'User created' });
      setTimeout(() => {
        navigation.navigate('FrontPage');
      }, 1500);
    } catch (e) {
      setShowModal({ show: true, text: '' + e });
      return;
    }
  };

  return (
    <>
      {showModal.show && (
        <CustomModal text={showModal.text} onPress={hideModal} />
      )}
      <SafeAreaView className="flex-1 bg-white">
        <BackHeader title="Be a Trainer" />
        <View className="flex-1 items-center mt-4">
          {renderLabel('Name', name, setName)}
          {renderLabel('E-mail', email, setEmail)}
          {renderLabel('Password', pass, setPass, true)}
          {renderLabel('Confirm Password', confirmPass, setConfirmPass, true)}
          <View className="h-12 w-[90%] mt-2">
            <PrimaryText text="Your Char: " classname="pt-[8]" />
          </View>
          <View className="flex-1 w-[90%] flex-row">
            {images.map((_, i) => {
              return (
                <View className="flex-1" key={i}>
                  <View className="h-12 w-full items-center justify-center">
                    {selection === i && (
                      <Animated.Image
                        source={require('../../assets/icons/selection-icon.png')}
                        resizeMode="contain"
                        className="h-12 w-12"
                        style={animatedStyle}
                      />
                    )}
                  </View>
                  <Pressable
                    className="flex-1 justify-center"
                    onPress={() => setSelection(i as 1 | 0)}
                  >
                    <Image
                      source={
                        i === 0
                          ? require('../../assets/images/profile/female-high.png')
                          : require('../../assets/images/profile/male-high.png')
                      }
                      resizeMode="contain"
                      className="w-full h-full"
                      style={selection !== i && { opacity: 0.4 }}
                    />
                  </Pressable>
                </View>
              );
            })}
          </View>
        </View>

        <View className="h-12 my-6 items-center w-full">
          <PrimaryButton
            text="Next >"
            onPress={() =>
              isEmptyStrings() && checkPass() && confirmRegistration()
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
}
