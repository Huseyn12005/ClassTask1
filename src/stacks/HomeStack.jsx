import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMMKVBoolean } from "react-native-mmkv";
import Home from '../screens/home/Home';
import SignUpScreen from '../screens/Signup/SignUpScreen';
import Login from '../screens/login/Login';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import Details from '../screens/details/Details';

const Stack = createNativeStackNavigator();

const HomeStack = () => {

  const [onboardingSeen] = useMMKVBoolean("onboardingSeen");

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {onboardingSeen == false && (
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="SignIn" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default HomeStack;
