import { NavigationContainer } from '@react-navigation/native';
import TabStack from './TabStack';
import HomeStack from './HomeStack';
import OnboardingScreen from '../screens/OnBoarding/OnBoardingScreen';
import Home from '../screens/home/Home';
import Login from '../screens/login/Login';

const Navigation = () => {
  return (
    <NavigationContainer>
        <HomeStack/>
    </NavigationContainer>
  )
}

export default Navigation