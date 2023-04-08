import type {NavigationContainerProps, Theme} from '@react-navigation/native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback} from 'react';

import {setErrorRouterInfo} from '@/components/error-boundary';

import BottomTab from './bottom-tab';
import {defaultStackRouteOptions} from './config';

import {navigationRef} from './root-navigation';
import stackRoutes from './stack';
import otherRoutes from './stack/others';
import type {RootStackParamList} from './typing';

export type {RootStackScreenProps, RootStackParamList} from './typing';

const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ECEEF1',
  },
};

const Stack = createStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
  const onStateChange: NavigationContainerProps['onStateChange'] = useCallback(
    state => {
      const {routes} = state;
      const router = routes[routes.length - 1];
      setErrorRouterInfo(router);
    },
    [],
  );

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={onStateChange}
      theme={NavigationTheme}>
      <Stack.Navigator>
        {
          <>
            <Stack.Screen
              name="HOME"
              component={BottomTab}
              options={{headerShown: false}}
            />
            {[...stackRoutes, ...otherRoutes].map(route => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{...defaultStackRouteOptions, ...route.options}}
              />
            ))}
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
