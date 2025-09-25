import { StyleSheet, Text, View } from "react-native";
import BukuFavorit from "../../components/HomeScreen/BukuFavorit";
import CariBuku from "../../components/HomeScreen/CariBuku";
import Profile from "../../components/HomeScreen/Profile";
import ScrollMenu from "../../components/HomeScreen/ScrollMenu";

const HomePage = () => {
  return (
    <View style={style.containerContent}>
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Hello</Text>
          <Text style={{ color: "#d1d1d1ff", fontSize: 40 }}>albert</Text>
          <Text style={{ color: "#d1d1d1ff", fontSize: 16 }}>
            Selamat Datang
          </Text>
        </View>
        <View>
          <Profile />
        </View>
      </View>
      {/* cari buku */}
      <CariBuku />
      {/* menu */}
      <View style={{ marginTop: 0, justifyContent: "flex-start" }}>
        <ScrollMenu />
      </View>
      {/* buku favorit */}
      <View
        style={{ alignItems: "flex-start", width: "100%", paddingLeft: 20 }}
      >
        <Text style={{ fontSize: 24, fontWeight: "600", color: "#305763" }}>
          Buku favorit
        </Text>
      </View>
      <BukuFavorit />
      <View
        style={{ alignItems: "flex-start", width: "100%", paddingLeft: 20 }}
      >
        <Text style={{ fontSize: 24, fontWeight: "600", color: "#305763" }}>
          Novel
        </Text>
      </View>
    </View>
  );
};

export default HomePage;

const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0f0",
  },
  titleContainer: {
    backgroundColor: "#5D7BF4",
    width: "100%",
    borderBottomRightRadius: 100,
    justifyContent: "flex-end",
    elevation: 10,
    height: 230,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 50,
    position: "relative",
  },
  title: {
    color: "#344175",
    fontSize: 30,
    fontWeight: "bold",
  },
});
