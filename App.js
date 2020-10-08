import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "./components/context";
import "./Global";
import DrawerStackScreen from "./screens/DrawerNav";
import RootStackScreen from "./screens/RootStackScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (username, password) => {
        // setIsLoading(false);
        fetch(`${BASE_URL}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            try {
              await AsyncStorage.setItem("userToken", data.data.token);
              const userToken = await AsyncStorage.getItem("userToken");
              dispatch({ type: "LOGIN", id: username, token: userToken });
            } catch (error) {
              console.log("Something went wrong with sky's Code", error);
              Alert(`Invalid User ${error}`);
            }
          });
        //  const userToken = AsyncStorage.getItem('userToken');
        // dispatch({ type: 'LOGIN', id: username, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null);
        //  setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: (username, password) => {
        // setIsLoading(false);
        fetch("http://mconnecthealth.com:2000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            try {
              await AsyncStorage.setItem("userToken", data.token);
            } catch (e) {
              console.log("Something went wrong with sky's Code", e);
              Alert(e);
            }
          });
        const userToken = AsyncStorage.getItem("userToken");
        dispatch({ type: "REGISTER", id: username, token: userToken });
      },
    }),
    []
  );

  const CheckToken = () => {
    setTimeout(async () => {
      setIsLoading(false);
      let checkToken;
      checkToken = null;
      try {
        checkToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: checkToken });
    }, 1000);
  };

  useEffect(() => {
    CheckToken();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <DrawerStackScreen />
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
      {/* </Provider> */}
    </AuthContext.Provider>
  );
}

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
