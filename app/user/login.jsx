import React, { useState } from "react";
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { loginUser, getUserInfo, saveUserSession } from "../../components/utils/api";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log('🔐 Attempting login with NIK:', username, 'Password:', password);
    const result = await loginUser(username, password);

    if (!result.ok || !result.data) {
      console.log('❌ Login failed:', result.data);
      Alert.alert('Error', result.data?.message || 'Login gagal');
      return;
    }

    const token = result.data.access_token;
    const nik = result.data.username;

    console.log('✅ Received token:', token);
    console.log('✅ Received username (NIK):', nik);

    if (!token || !nik) {
      console.warn('⚠️ Token atau username tidak ditemukan dalam response:', result);
      Alert.alert('Error', 'Token atau username tidak valid');
      return;
    }

    try {
      const realname = await getUserInfo(token, nik);
      console.log('👤 Fetched realname:', realname);

      await saveUserSession({ token, username: nik, realname });
      console.log('📦 Session saved');

      Alert.alert('Success', 'Login successful');
      console.log('➡️ Navigating to homepage...');
      router.push('/page/HomePage');
    } catch (error) {
      console.log('❌ Gagal ambil data user:', error);
      Alert.alert('Error', 'Gagal ambil data user');
    }
  };

  return (
    <View style={style.containerContent}>
      <View style={{ justifyContent: "flex-start", width: "100%" }}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Welcome Back</Text>
          <Text style={{ marginLeft: 20, color: "#BCBCBC", fontSize: 16 }}>
            Sign In Your Account
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, gap: 10 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 15, color: "#717171", right: -20 }}>NIK</Text>
          <TextInput
            placeholder="Masukkan NIK"
            value={username}
            onChangeText={setUsername}
            style={style.textInput}
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, color: "#717171", right: -20 }}>Password</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={style.textInput}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={style.icons}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={style.button} onPress={handleLogin}>
          <Text style={{ color: "#f0f0f0", fontSize: 20, fontWeight: "bold" }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0f0",
  },
  titleContainer: {
    backgroundColor: "#5D7BF4",
    height: 286,
    width: "100%",
    borderBottomRightRadius: 100,
    justifyContent: "center",
    elevation: 10,
  },
  title: {
    color: "#344175",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },
  textInput: {
    height: 50,
    width: 330,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#5D7BF4",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  icons: {
    position: "absolute",
    right: 30,
    top: 15,
  },
});