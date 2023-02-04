import React from "react";
import axios from "axios";
import { View } from "react-native";
import styled from "styled-components/native";
import Loading from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export default function FullPostScreen({ route, navigation }) {
  const [fullPost, setFullPost] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({title,})
    axios
      .get("https://63dd15402308e3e319f44aaa.mockapi.io/posts/"+id)
      .then(({ data }) => setFullPost(data))
      .catch((err) => {
        console.log(err);
        Alert.alert("error", "havn't get posts");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri: fullPost.imageUrl }} />
      <PostText>{fullPost.text}</PostText>
    </View>
  );
}
