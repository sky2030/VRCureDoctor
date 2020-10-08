import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";

function DoctorTransaction({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <ScrollView>
        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.titletext}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Patient</Text>
              <Text style={styles.headtext2}>Rahul Kumar </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext3}>Rs.1000/- </Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.titletext}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Patient</Text>
              <Text style={styles.headtext2}>Raman Singh </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext3}>Rs.1000/- </Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.titletext}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Patient</Text>
              <Text style={styles.headtext2}>Sanjay Sharma </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext3}>Rs.1500/- </Text>
            </View>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.header}>
            <Text style={styles.headtext1}>25 JUN 2020 </Text>
          </View>
          <View style={styles.title4}>
            <View style={styles.title7}>
              <Text style={styles.headtext2}>Invoice No.</Text>
              <Text style={styles.titletext}>#INVR5RK6SOYH2 </Text>
            </View>
            <View style={styles.title8}>
              <Text style={styles.headtext2}>Patient</Text>
              <Text style={styles.headtext2}>Avneet Dixit </Text>
            </View>
            <View style={styles.title6}>
              <Text style={styles.headtext2}>Amount</Text>
              <Text style={styles.headtext3}>Rs.1200/- </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => navigation.navigate("PrivacyPolicy")}
        style={styles.footer}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DoctorTransaction;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  head: {
    backgroundColor: "white",
    padding: 20,
    height: 60,
    width: "100%",
  },
  TopHeader: {
    flexDirection: "row",
    width: "200%",
    width: 350,
    height: 40,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "rgba(108, 236, 214,0.6)",
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
    fontSize: 15,
    fontWeight: "bold",
  },
  headtext: {
    color: "#2E76B6",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    borderColor: "#2E76B6",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  headtext1: {
    color: "#2F504C",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  btntext: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },
  headtext2: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
    marginLeft: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  titletext: {
    color: "#E3445C",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  header6: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },
  headtext3: {
    color: "#317346",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 5,
    marginLeft: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  headtext4: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 70,
  },
  header: {
    color: "black",
    backgroundColor: "#E8F8ED",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: 30,
  },
  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  card1: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#55DE61",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderBottomRightRadius: 10,
    marginTop: 10,
    width: "90%",
    height: 90,
    borderWidth: 1,
    borderColor: "#1C3B5D",
    marginTop: 20,
  },
  card2: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#CED2DC",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  card3: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#7B6DA3",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input3: {
    marginBottom: 15,
    marginTop: 15,
  },
  input1: {
    alignContent: "center",
    justifyContent: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 15,
  },
  baseText1: {
    marginBottom: 15,
    marginTop: 15,
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  title1: {
    flexDirection: "row",
    marginRight: 20,
  },
  title2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  title3: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 170,
    flexDirection: "row",
  },
  title4: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
  },
  title5: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 10,
    flexDirection: "column",
  },
  title6: {
    marginLeft: 20,
    flexDirection: "column",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#C7E0CA",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#55DE61",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 5,
    borderBottomWidth: 2,
    borderColor: "#15510C",
    width: "20%",
  },
  title7: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "column",
    width: "33%",
  },
  title8: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    flexDirection: "column",
    width: "32%",
  },
  title9: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 60,
    flexDirection: "column",
    marginRight: 10,
  },
  title10: {
    color: "white",
    backgroundColor: "#192161",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginHorizontal: 20,
  },
  title11: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 20,
    flexDirection: "column",
  },
  header2: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
    marginRight: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header3: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 10,
  },
  header4: {
    color: "#4E557C",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 70,
    marginTop: 10,
  },
  header5: {
    color: "green",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 10,
  },
  headtext6: {
    color: "blue",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 10,
  },
  detail: {
    flexDirection: "row",
  },
  img: {
    marginBottom: 5,
    padding: 20,
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginLeft: 10,
  },
  collapseview: {
    flexDirection: "column",
  },
  btn: {
    width: 150,
    backgroundColor: "#707379",
    padding: 5,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    flexDirection: "row",
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 3,
    marginBottom: 20,
    marginLeft: 20,
  },
  img1: {
    marginBottom: 40,
    padding: 15,
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
