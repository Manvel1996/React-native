import axios from "axios";
import React from "react";
import {
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Loading from "../components/Loading";
import { Post } from "../components/Post";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetcPosts = () => {
    setIsLoading(true);
    axios
      .get("https://63dd15402308e3e319f44aaa.mockapi.io/posts")
      .then(({ data }) => setPosts(data))
      .catch((err) => {
        console.log(err);
        Alert.alert("error", "havn't get posts");
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    fetcPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetcPosts} />
            }
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("FullPost", {
                    id: item.id,
                    title: item.title,
                  })
                }>
                <Post
                  title={item.title}
                  imageUrl={item.imageUrl}
                  createdAt={item.createdAt}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
}
