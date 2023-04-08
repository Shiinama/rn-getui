import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import React, { memo } from 'react'
import { Image, View, Text } from 'react-native'

import EStyleSheet from '@/lib/react-native-extended-stylesheet'
import Home from '@/pages/home'
import Getui from '@/pages/getui'

import images from './images/index'

export type BottomTabParamList = {
  HOME_HOME: undefined
  APPROVE: undefined
  MINE: undefined
}

const Tabs = createBottomTabNavigator<BottomTabParamList>()
const imgRender = (key, focused, badge?: number) => {
  return (
    <View style={styles.bottomIcon}>
      <Image source={images?.[`${key}${focused ? '_active' : ''}`]} style={styles.bottomIconImg} />
      {badge ? (
        <View style={styles.bottomBadge}>
          <Text style={styles.bottomBadgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>
  )
}
const BottomTab: React.FC = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="HOME_HOME"
        component={Home}
        options={{
          title: '工作台',
          tabBarIcon: ({ focused }) => imgRender('home', focused),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="MINE"
        component={Getui}
        options={{
          title: '个推',
          tabBarIcon: ({ focused }) => imgRender('me', focused),
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  )
}
const styles = EStyleSheet.create({
  bottomIcon: {
    position: 'relative',
  },
  bottomIconImg: {
    width: 24,
    height: 24,
  },
  bottomBadge: {
    position: 'absolute',
    left: 16,
    top: -3,
    height: 16,
    minWidth: 16,
    paddingHorizontal: 5,
    paddingTop: 2,
    backgroundColor: '#F92F2F',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  bottomBadgeText: {
    fontSize: 14,
    lineHeight: 14,
    color: '#fff',
  },
})
export default memo(BottomTab)
