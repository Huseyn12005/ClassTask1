import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import YoutubePlayer from "react-native-youtube-iframe";
import {useMMKVString} from 'react-native-mmkv';
import { useRoute, useNavigation } from "@react-navigation/native";

// ✅ API URLs
const API_URL = "http://192.168.1.73:5001/api/v1";
const IMG_URL = "https://image.tmdb.org/t/p/w500"; // TMDB Image URL

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, type } = route.params; // ✅ Correctly getting id and type from navigation

  const [data, setData] = useState(null);
  const [similarData, setSimilarData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useMMKVString('authToken');


  const getData = async () => {
    console.log("Token being used:", token);
    try {
      const response = await axios.get(`${API_URL}/${type}/${id}/details`, {
        headers: { Accept: "application/json" },
      });
  
      console.log("Fetched Data:", response.data);
  
      setData(response.data.content || response.data);
      setGenres(response.data.content?.genres || response.data.genres || []);
    } catch (error) {
      console.error("Error fetching details:", error.message);
    }
  };

  const getTrailers = async () => {
    try {
      const response = await axios.get(`${API_URL}/${type}/${id}/trailers`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.trailers?.length > 0) {
        setTrailerKey(response.data.trailers[0].key);
      }
    } catch (error) {
      console.error("Error fetching trailers:", error.message);
    }
  };

  const getSimilarData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${type}/${id}/similar`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setSimilarData(response.data.similar || []);
    } catch (error) {
      console.error("Error fetching similar data:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
  
      await getData();
      await getTrailers();
      await getSimilarData();
      setLoading(false);
    };
  
    fetchData();
  }, [id, type, token]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="red" />
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView className="p-1">
        {trailerKey ? (
          <YoutubePlayer height={240} videoId={trailerKey} />
        ) : (
          <Text className="text-white text-center">No Trailer Available</Text>
        )}

        <Text className="text-white text-3xl font-bold mt-4">
          {type === "movie" ? data?.title : data?.name}
        </Text>

        <FlatList
          data={genres}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <Text className="text-white text-sm bg-gray-700 px-3 py-1 rounded-lg">
              {item.name}
            </Text>
          )}
        />

        <Text className="text-white mt-4">{data?.overview}</Text>

        <Text className="text-white text-2xl font-bold mt-6">
          {type === "movie" ? "Similar Movies" : "Similar TV Shows"}
        </Text>

        <FlatList
          data={similarData}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ gap: 20, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.push("Details", { id: item.id, type })}
            >
              <Image
                source={{ uri: `${IMG_URL}${item.poster_path}` }}
                style={{ width: 150, height: 225 }}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
