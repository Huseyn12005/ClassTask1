import { NavigationContainer } from '@react-navigation/native';
import TabStack from './TabStack';
import HomeStack from './HomeStack';

const Navigation = () => {
  return (
    <NavigationContainer>
        <HomeStack/>
    </NavigationContainer>
  )
}

export default Navigation