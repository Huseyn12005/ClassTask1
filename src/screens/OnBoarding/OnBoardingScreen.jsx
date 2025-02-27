import { View, Text, Image, FlatList, TouchableOpacity, Dimensions, ImageBackground} from 'react-native';
import React, { useRef, useState  } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMMKVBoolean } from "react-native-mmkv";
import Logo from '../../assets/Logonetflix.png';

const { width, height } = Dimensions.get("window");

const slides = [
  { id: "1", image: require("../../assets/laptop.png"), title: "Watch on any device", description: "Stream on your phone, tablet, laptop and TV without paying more." },
  { id: "2", image: require("../../assets/download.png"), title: "3, 2, 1... download!", description: "Always have something to watch offline." },
  { id: "3", image: require("../../assets/population.png"), title: "No pesky contracts.", description: "Cancel anytime." },
  { id: "4", image: require("../../assets/how-to-watch.png"), title: "How do I watch?", description: "Members that subscribe to Netflix can watch here in the app." },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setOnboardingSeen] = useMMKVBoolean("onboardingSeen");

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      setOnboardingSeen(true);
      navigation.navigate("SignIn");
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <ImageBackground
      source={currentIndex === 3 ? require("../../assets/how-to-watch.png") : null} // Change background on last slide
      style={{ flex: 1, width, height, alignItems: "center", justifyContent: "center" }}
      resizeMode="cover"
      ></ImageBackground>

      <Image source={Logo} className="w-15 h-10 top-10" resizeMode="contain" />
      

      <FlatList
        ref={flatListRef}

        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={{ width, height, alignItems: "center", justifyContent: "center", padding: 20,bottom: 120 }}>
           {currentIndex !== 3 && (
            <Image source={item.image} style={{ width: 250, height: 250, marginBottom: 20 }} resizeMode="contain" />
              )}
            <Text className="text-white text-2xl font-bold mb-2 text-center">{item.title}</Text>
            <Text className="text-gray-400 text-center">{item.description}</Text>
          </View>
        )}
      />

      <View className="flex-row absolute bottom-40">
        {slides.map((_, index) => (
          <View key={index} className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? "bg-red-600" : "bg-gray-500"}`} />
        ))}
      </View>

      <TouchableOpacity onPress={handleNext} className="bg-red-600 w-11/12 p-4 rounded-lg absolute bottom-10">
        <Text className="text-white text-center text-lg font-bold">NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
