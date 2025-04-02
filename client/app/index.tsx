import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import './globals.css';
import { AuthProvider } from "@/context/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/components/Home";
import Post from "@/components/Post";
import Account from "@/components/Account";
import HeaderMenu from "@/components/menus/HeaderMenu";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import { PostProvider } from "@/context/postContext";
import MyPost from "@/components/MyPost";



const index = () => {

  const Stack = createNativeStackNavigator();

  return (

    <NavigationIndependentTree>
      <NavigationContainer>
        <AuthProvider>
          <PostProvider>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: "Full Stack App React Native",
                  headerRight: () => <HeaderMenu />
                }} />
              <Stack.Screen
                name="MyPost"
                component={MyPost}
                options={{
                  title: "Full Stack App React Native",
                  headerRight: () => <HeaderMenu />
                }} />
              <Stack.Screen
                name="Post"
                component={Post}
                options={{
                  title: "Full Stack App React Native",
                  headerRight: () => <HeaderMenu />
                }} />
              <Stack.Screen
                name="Account"
                component={Account}
                options={{
                  title: "Full Stack App React Native",
                  headerRight: () => <HeaderMenu />
                }} />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }} />
            </Stack.Navigator>
          </PostProvider>
        </AuthProvider>
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}

export default index;