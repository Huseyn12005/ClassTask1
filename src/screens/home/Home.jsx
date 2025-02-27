import { View, Text, Image, TouchableOpacity, FlatList,ScrollView,Dimensions } from 'react-native';
import React, { useState,useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../assets/Logonetflix.png';

const Home = () => {
  const navigation = useNavigation();
  const [featured, setFeatured] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  const { width, height } = Dimensions.get("window");
  
  useEffect(() => {
    const fetchTrendingData = async () => {
        try {
            const movieRes = await fetch("http://192.168.1.73:5001/api/v1/movie/trending");
            const tvRes = await fetch("http://192.168.1.73:5001/api/v1/tv/trending");

            const movieData = await movieRes.json();
            const tvData = await tvRes.json();

            console.log("Movies Data:", movieData);  
            console.log("TV Shows Data:", tvData);

            setMovies(movieData.content || []);
            setTvShows(tvData.content || []);

            if (movieData.content && movieData.content.length > 0) {
                const randomMovie = movieData.content[Math.floor(Math.random() * movieData.content.length)];
                console.log("Featured Movie:", randomMovie);
                setFeatured(randomMovie); 
            }
       
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchTrendingData();
}, []);
  const handleNavigation = (item, type) => {
    navigation.push("Details", { id: item.id, type });
  };

  return (
    <ScrollView className="flex-1 bg-black ">
      <Image source={Logo} className="w-25 h-10 right-20 mt-5 mb-5 " resizeMode="contain" />

      {featured && (
        <View className=" items-center">
            
          <Image
            
            source={{ uri: `https://image.tmdb.org/t/p/w500${featured.poster_path}` }} 
             style={{ width: 260, height: 360, position: "absolute",justifyContent: 'center',flexDirection: 'row',alignItems: 'center' }}
             onError={(e) => console.log("Image Load Error:", e.nativeEvent)}
        />

          <View className="flex-row justify-center top-24 pt-24 mt-24">
            <TouchableOpacity
              className="bg-white px-10 py-4 rounded-xl mr-2 mt-5"
              onPress={() => handleNavigation(featured, featured.media_type)}
            >
              <Text className="text-black text-lg font-bold">Play</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-700  px-10 py-4 rounded-xl mt-5"
              onPress={() => handleNavigation(featured, featured.media_type)}
            >
              <Text className="text-white text-lg font-bold">More Info</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className='pt-24 mt-24'>
      <Text className="text-white text-3xl mt-5 mb-5">Trending Movies</Text>
      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="pr-5" onPress={() => handleNavigation(item, "movie")}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
            style={{ width: 150, height: 225 }}
            onError={(e) => console.log("Image Load Error:", e.nativeEvent)}
            />
          </TouchableOpacity>
        )}
      />

      <Text className="text-white text-3xl mt-10 mb-5">Popular TV Shows</Text>
      <FlatList
        data={tvShows}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="pr-5" onPress={() => handleNavigation(item, "tv")}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
                style={{ width: 150, height: 225 }}
                onError={(e) => console.log("Image Load Error:", e.nativeEvent)}
            />
          </TouchableOpacity>
        )}
      />
      </View>
    </ScrollView>
  );
};

export default Home;
