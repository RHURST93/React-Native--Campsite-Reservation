import { FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
//import { useState } from "react";
import { CAMPSITES } from "../shared/campsites";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseURL";
import { Text, View } from "react-native";
import Loading from "../components/LoadingComponent";
import * as Animatable from "react-native-animatable";

const DirectoryScreen = ({ navigation }) => {
  //const [campsites, setCampsites] = useState(CAMPSITES);
  const campsites = useSelector((state) => state.campsites);

  if (campsites.isLoading) {
    return <Loading />;
  }

  if (campsites.errMess) {
    return (
      <View>
        <Text>{campsites.errMess}</Text>
      </View>
    );
  }

  const renderDirectoryItem = ({ item: campsite }) => {
    return (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          title={campsite.name}
          caption={campsite.description}
          featured
          onPress={() => navigation.navigate("CampsiteInfo", { campsite })}
          imageSrc={{ uri: baseUrl + campsite.image }}
        />
      </Animatable.View>
    );
  };
  return (
    <FlatList
      data={campsites.campsitesArray}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DirectoryScreen;
