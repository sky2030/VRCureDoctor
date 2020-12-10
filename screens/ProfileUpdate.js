import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import moment from "moment-timezone";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-community/async-storage";
import { AntDesign } from "@expo/vector-icons";

const ProfileUpdate = ({ navigation, route }) => {
  //const [first_name,setName] = useState(getDetails("name"))
  const [first_name, setFirstName] = useState(route.params.data.first_name);
  const [last_name, setLastName] = useState(route.params.data.last_name);
  const [mobile, setMobile] = useState(route.params.data.mobile);
  const [email, setEmail] = useState(route.params.data.email);
  const [dob, setDOB] = useState(moment().format("ll"));
  const [experience, setExperience] = useState(route.params.data.experience);
  const [degree, setDegree] = useState(route.params.data.degree);
  const [designation, setDesignation] = useState(route.params.data.designation);
  const [specialities, setSpecialities] = useState(
    route.params.data.specialities
  );
  const [picture, setPicture] = useState(route.params.data.picture);
  const [modal, setModal] = useState(false);
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);

  const submitData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    fetch(`${BASE_URL}${route.params.data.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        mobile,
        email,
        dob,
        picture,
        experience,
        degree,
        designation,
        specialities,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data msg :", data.message)
        Alert.alert(Alert_Title, data.message);
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const updateDOB = async (sdate) => {
    setDOB(moment(sdate).startOf("day").format("ll"));
  };
  const handleDatePicker = (date) => {
    setDOB(moment(date).format("DD/MM/YYYY"));
    //updateDOB(date);
    setDatePickerAvailable(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // updateDOB(new Date());
      setFirstName(route.params.data.first_name);
      setLastName(route.params.data.last_name);
      setMobile(route.params.data.mobile);
      setEmail(route.params.data.email);
      setDOB(route.params.data.dob);
      setExperience(route.params.data.experience);
      setDegree(route.params.data.degree);
      setDesignation(route.params.data.designation);
      setSpecialities(route.params.data.specialities);
      setPicture(route.params.data.picture);
      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params.data]);

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setPicture(`data:image/jpeg;base64,${data.base64}`);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        //  aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });
      // console.log(data.base64);
      if (!data.cancelled) {
        //  handleUpload(newfile);
        setPicture(`data:image/jpeg;base64,${data.base64}`);
      }
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  // const renderList = (item) => {
  //   return (
  //     <TouchableOpacity
  //       activeOpacity={0.95}
  //       onPress={() => {
  //         setDepartment(item.departmentname);
  //         setDeptcode(item.deptcode);
  //       }}
  //       style={styles.option}
  //     >
  //       <Text style={styles.deptName}>{item.departmentname}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <MaterialIcons
          name="navigate-before"
          size={30}
          onPress={() => navigation.goBack()}
          style={styles.back}
        />

        <Text style={styles.headtext}>Update Profile</Text>
      </View>

      {/* <Text style={{fontSize:18}}> {HospitalCode.hospitalcode} </Text> */}

      <ScrollView style={styles.formArea}>
        <DateTimePickerModal
          isVisible={isDatePickerAvailable}
          mode="date"
          onConfirm={handleDatePicker}
          onCancel={() => setDatePickerAvailable(false)}
        />
        <TextInput
          label="First Name"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={first_name}
          // onFocus={()=>setenableShift(false)}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          label="Last Name"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={last_name}
          // onFocus={()=>setenableShift(false)}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          label="Email"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={email}
          theme={theme}
          // onFocus={()=>setenableShift(false)}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Phone"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={mobile}
          theme={theme}
          //onFocus={()=>setenableShift(false)}
          keyboardType="number-pad"
          mode="outlined"
          onChangeText={(text) => setMobile(text)}
        />

        <View style={styles.Subtitle}>
          <Text style={styles.toptext}> Date of Birth {dob}</Text>
          <TouchableOpacity
            style={{
              color: "#08211c",
              marginLeft: 10,
              flex: 1,
            }}
            onPress={() => setDatePickerAvailable(true)}
          >
            <AntDesign name="calendar" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* <TextInput
          label="Date of Birth"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={dob}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setDOB(text)}
        /> */}

        <TextInput
          label="Experience"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={experience}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setExperience(text)}
        />

        <TextInput
          label="Degree"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={degree}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setDegree(text)}
        />
        <TextInput
          label="Designation"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={designation}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setDesignation(text)}
        />

        <TextInput
          label="Specialities"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={specialities}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          mode="outlined"
          onChangeText={(text) => setSpecialities(text)}
        />
        <Button
          style={styles.btn}
          icon={picture == "" ? "upload" : "check"}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}
        >
          Upload Image
        </Button>

        <Button
          style={styles.btn}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => submitData()}
        >
          save
        </Button>

        <View style={{ flex: 0.6, alignItems: "center" }}>
          <Image source={{ uri: picture }} style={styles.thumbnail} />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              theme={theme}
              mode="contained"
              onPress={() => pickFromCamera()}
            >
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => pickFromGallery()}
            >
              gallery
            </Button>
          </View>
          <Button theme={theme} onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#e01d5e",
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Subtitle: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    marginHorizontal: 22,
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
  },
  toptext: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  thumbnail: {
    aspectRatio: 1,
    width: 200,
    height: 200,
  },
  head: {
    backgroundColor: "#fff",
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  back: {
    padding: 10,
    color: "#e01d5e",
  },
  headtext: {
    color: "#e01d5e",
    fontSize: 21,
    fontWeight: "600",
    textAlign: "center",
    width: "80%",
  },

  formArea: {
    height: "100%",
  },
  root: {
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -1,
    paddingLeft: 2,
    color: "#05375a",
    height: 38,
    elevation: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 3,
    marginHorizontal: 20,
  },

  option: {
    marginTop: Platform.OS === "ios" ? 0 : -1,
    padding: 6,
    color: "#05375a",
    marginEnd: 300,
    elevation: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  deptName: {
    color: "#05375a",
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    marginVertical: 5,
  },
  modalView: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default ProfileUpdate;
