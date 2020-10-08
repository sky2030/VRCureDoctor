import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";
const screenWidth = Math.round(Dimensions.get("window").width);

const AVALABLE_COLOR = "#D7F4DC";
const BOOKED_COLOR = "#03b500";
const CANCELED_COLOR = "#de0202";
const IS_AVAILABLE = "available";
const IS_BOOKED = "booked";
const IS_CANCELED = "canceled";

function DoctorSlot({ navigation, route }) {
  const [slotDate, setslotDate] = useState(moment().format("ll"));
  // let startDate = 0;
  // let endDate = 0;
  let startDate = moment().startOf("day").format("x");
  let endDate = moment().endOf("day").format("x");
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);

  const updateStartEndDate = async (sdate) => {
    startDate = moment(sdate).startOf("day").format("x");
    endDate = moment(sdate).endOf("day").format("x");
    setslotDate(moment(sdate).startOf("day").format("ll"));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      updateStartEndDate(new Date());
      setAppointmentList([]);
      fetchData();
    });
    return unsubscribe;
  }, [route.params]);

  const handleDatePicker = (date) => {
    updateStartEndDate(date);
    setDatePickerAvailable(false);
    fetchData();
  };

  const displayBGSlot = (item) => {
    if (item == IS_BOOKED) {
      return BOOKED_COLOR;
    } else if (item == IS_CANCELED) {
      return CANCELED_COLOR;
    }
    return AVALABLE_COLOR;
  };

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}slots?day_from=${startDate}&day_to=${endDate}`;
    console.log(URL);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(JSON.stringify(results));
        if (results.code != 200) {
          Alert.alert(Alert_Title, results.message);
        } else {
          setAppointmentList(results.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const StringFromTime = (timevalue) => {
    if (timevalue <= 0) {
      return "12:00 AM";
    }
    const time = Number(timevalue) / 60000;
    let sdate = new Date();
    sdate.setHours(Math.floor(time / 60));
    sdate.setMinutes(time % 60);
    var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
    // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

    return returnValue;
  };
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        style={{
          borderRadius: 4,
          elevation: 3,
          backgroundColor: displayBGSlot(item.status),
          borderWidth: 1,
          borderColor: "#1B5D9B",
          marginHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 3,
          flex: 1,
          marginTop: 10,
          flexDirection: "row",
        }}
        onPress={() => navigation.navigate("ManageConsultation", { item })}
      >
        <View style={styles.PatientText}>
          <Text style={styles.timetext}>{item.status.toUpperCase()}</Text>
        </View>

        <View style={styles.PatientText}>
          <Text style={styles.timetext}>
            {moment(item.day_millis).format("ll")}
          </Text>
        </View>
        <View style={styles.buttonheader}>
          <Text style={styles.timetext}>
            {StringFromTime(item.time_millis)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />
        <Text style={styles.titletext}>Doctor Slots</Text>
      </View>

      <View style={styles.Subtitle}>
        <Text style={styles.toptext}>
          Your Consultation Slots on {slotDate}
        </Text>
        <TouchableOpacity
          style={{
            color: "#08211c",
            margin: 10,
          }}
          onPress={() => setDatePickerAvailable(true)}
        >
          <AntDesign name="calendar" size={32} color="black" />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        activeOpacity={0.95}
        style={styles.AppointmentCard}
        onPress={() => navigation.navigate("ManageConsultation")}
      >
        <View style={styles.PatientText}>
          <Text style={styles.timetext}>
            {moment(item.day_millis).format("ll")}
            {moment(1601110212281).format("ll")}
          </Text>
        </View>
        <View style={styles.buttonheader}>
          <Text style={styles.timetext}>
            {StringFromTime(item.time_millis)}
            {StringFromTime(1601110289997)}
          </Text>
        </View>
      </TouchableOpacity> */}

      <FlatList
        style={{ marginBottom: 20 }}
        data={appointmentList}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => item.id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      <DateTimePickerModal
        isVisible={isDatePickerAvailable}
        mode="date"
        onConfirm={handleDatePicker}
        onCancel={() => setDatePickerAvailable(false)}
      />

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

export default DoctorSlot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  back: {
    padding: 10,
    color: "#4E557C",
  },
  headtext: {
    color: "#08211c",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "500",
  },
  head: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  titletext: {
    color: "#4E557C",
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    position: "absolute",
    bottom: 1,
    backgroundColor: "#009387",
    padding: 20,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomtext: {
    color: "#fff",
    fontSize: 15,
  },

  Cardheadtext: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  btntext: {
    color: "black",
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "bold",
  },
  Patientbodytext: {
    color: "darkred",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 4,
    marginLeft: 15,
  },
  Patienthead: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 4,
    marginLeft: 15,
  },

  header: {
    color: "white",
    backgroundColor: "#3B565B",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 35,
    //marginTop:10,
  },

  AppointmentCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#D7F4DC",
    borderWidth: 1,
    borderColor: "#1B5D9B",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
  },

  Subtitle: {
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 15,
  },
  toptext: {
    //marginBottom: 15,
    marginTop: 15,
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  Cardbody: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 10,
  },
  buttonheader: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  PatientText: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  title5: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginLeft: 25,
    marginRight: 10,
    flexDirection: "column",
    marginLeft: 70,
    marginBottom: 20,
  },

  timetext: {
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  datetext: {
    fontSize: 20,
  },
  btn: {
    width: 70,
    backgroundColor: "#078191",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  btn1: {
    width: 120,
    backgroundColor: "#078191",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 3,
    marginRight: 10,
  },

  Actionable: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 50,
    paddingRight: 5,
    marginTop: 5,
  },
  btn2: {
    width: 180,
    backgroundColor: "#078191",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
});
