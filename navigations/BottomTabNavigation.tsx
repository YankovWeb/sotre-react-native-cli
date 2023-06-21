import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from '../components/Icon';
import Home from '../views/Home';
import Cart from '../views/Cart';
import StackNavigation from './StackNavigation';
import {selectCartTotalQuantity} from '../features/cart/cartSlice';
import {useAppSelector} from '../store/store';

const Navigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  const totalQuantity = useAppSelector(selectCartTotalQuantity);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={false}
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => {
            let iconName: string = '';
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Shop') {
              iconName = 'isv';
            } else {
              iconName = 'shoppingcart';
            }

            return <Icon name={iconName} size={20} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Shop" component={StackNavigation} />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{tabBarBadge: totalQuantity}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
