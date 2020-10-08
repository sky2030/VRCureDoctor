import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  Fontisto,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";

function ProfileDoctor({ navigation }) {
  const [data, Setdata] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //  console.log(userToken)
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          Setdata(results.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      GetProfile();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <ScrollView>
        <View style={styles.HeadCard}>
          <Image source={{ uri: data.picture }} style={styles.img} />

          <Text style={styles.headtext1}>Welcome Dr. {data.first_name} </Text>
          <View style={styles.row1}>
            <FontAwesome5
              name="registered"
              size={20}
              color="#d02860"
              style={{ marginLeft: 10 }}
            />
            <Text style={styles.registration}>{data.registration_no}</Text>
            <Text style={styles.expstyle}> {data.experience} EXP.</Text>
          </View>
        </View>

        <Animatable.View animation="fadeInUpBig">
          <View style={styles.DetailCard}>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Name</Text>
              </View>
              <Fontisto name="doctor" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>
                  Dr. {data.first_name} {data.last_name}
                </Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Gender</Text>
              </View>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={24}
                color="#d02860"
              />

              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.gender}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Reg. No</Text>
              </View>
              <FontAwesome5 name="registered" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.registration_no}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Department</Text>
              </View>
              <MaterialCommunityIcons
                name="google-circles-group"
                size={24}
                color="#d02860"
              />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.department}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Degree</Text>
              </View>
              <MaterialCommunityIcons
                name="certificate"
                size={24}
                color="#d02860"
              />

              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.degree}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Experience</Text>
              </View>
              <Fontisto name="doctor" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.experience}</Text>
              </View>
            </View>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Mobile No</Text>
              </View>

              <Entypo name="mobile" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.mobile}</Text>
              </View>
            </View>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Email</Text>
              </View>
              <MaterialIcons name="email" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.email}</Text>
              </View>
            </View>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Designation</Text>
              </View>
              <MaterialCommunityIcons
                name="chair-rolling"
                size={24}
                color="#d02860"
              />

              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.designation}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigation.navigate("updateprofile", { data })}
        style={styles.footer}
      >
        <Text style={styles.bottomtext}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileDoctor;

const theme = {
  colors: {
    primary: "pink",
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  btn: {
    backgroundColor: "#58DCFC",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  head: {
    backgroundColor: "#58DCFC",
    padding: 20,
    height: 60,
    width: "100%",
  },
  footer: {
    backgroundColor: "white",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  bottomtext: {
    color: "#e01d5e",
    fontSize: 16,
    backgroundColor: "#eee",
    fontWeight: "900",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 15,
  },
  registration: {
    color: "#d02860",
    fontSize: 15,
    fontWeight: "900",
    flex: 2,
    marginLeft: 10,
  },
  expstyle: {
    color: "#d02860",
    fontSize: 15,
    fontWeight: "900",
    flex: 1,
    marginRight: 10,
  },
  headtext: {
    color: "black",
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
  },
  headtext1: {
    color: "#d02860",
    marginBottom: 10,
    fontSize: 22,
    fontWeight: "900",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginEnd: 15,
    marginTop: 15,
  },

  titlebody: {
    color: "#d02860",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "900",
  },
  informationtext: {
    marginLeft: 10,
    flex: 2,
    justifyContent: "center",
  },
  fetcheddata: {
    color: "black",
    marginBottom: 5,
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  ExpText: {
    color: "black",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#A67CC5",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },

  DetailCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "95%",
    flexDirection: "column",
    marginLeft: 10,
    marginRight: 20,
    paddingBottom: 10,
  },
  HeadCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    margin: 10,
  },
  cardContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input3: {
    marginBottom: 15,
    marginTop: 15,
  },
  img: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },

  detailrows: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 8,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 2,
    elevation: 0,
    width: "100%",
  },
  bodytitle: {
    flexDirection: "row",
    width: 120,
    marginRight: 30,
    flex: 1,
  },
  addressText: {
    color: "#d02860",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "900",
    justifyContent: "center",
    alignItems: "center",
  },
  ExperienceCard: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
