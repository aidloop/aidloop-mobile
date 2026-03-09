import AntDesign from "@expo/vector-icons/AntDesign";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function createAccount() {
  const Input = ({ InputText, placeholder }) => (
    <View style={styles.input}>
      <Text style={{ marginBottom: 8 }}>{InputText}</Text>
      <TextInput
        style={styles.formInput}
        placeholder={placeholder}
        placeholderTextColor={"grey"}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.safeview}>
      <View>
        <View>
          <Text style={styles.heading}>Create an Account</Text>
          <Text style={styles.text}>Continue supporting your community</Text>
        </View>
        <TouchableOpacity style={styles.googleBtn}>
          <AntDesign name="google" size={24} color="green" />
          <Text style={styles.googletext}>Google</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.border} />
        <Text>or</Text>
        <View style={styles.border} />
      </View>
      <View style={styles.form}>
        <Input InputText={"Full Name"} placeholder={"e.g. John Doe Scott"} />
        <Input
          InputText={"Email Address"}
          placeholder={"Your Email Address here..."}
        />
        <Input InputText={"Password"} placeholder={"Your password here"} />
      </View>
      <TouchableOpacity style={styles.createBtn}>
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.bottomText}>
        <Text style={styles.loginText}>
          Already have an account?
          <TouchableOpacity>
            <Text style={styles.loginPress}> Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: { padding: 30 },
  createBtn: {
    backgroundColor: "navy",
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 60,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 20,
  },

  loginText: {
    textAlign: "center",
    fontSize: 18,
  },
  loginPress: { fontSize: 18, color: "navy", fontWeight: 500 },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: 900,
    fontSize: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    lineHeight: 26,
    marginTop: 20,
    paddingHorizontal: 60,
  },

  googletext: {
    fontSize: 20,
  },

  googleBtn: {
    flexDirection: "row",
    borderColor: "gray",
    marginVertical: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
    borderRadius: 10,
  },
  border: {
    borderWidth: 0.25,
    width: "45%",
    borderColor: "grey",
  },

  form: { marginVertical: 20 },
  input: { marginVertical: 15 },

  formInput: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
  },

  bottomText: { position: "absolute", bottom: 10, alignSelf: "center" },
});
