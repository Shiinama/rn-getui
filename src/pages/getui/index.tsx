import geTuiStore from '@/stores/getui'
import React from 'react'
import type { PropsWithChildren } from 'react'
import { Button, ScrollView, Text, useColorScheme, NativeAppEventEmitter, View, Alert } from 'react-native'
import EStyleSheet from '@/lib/react-native-extended-stylesheet'
import Getui from 'react-native-getui'
import { Colors } from 'react-native/Libraries/NewAppScreen'

type SectionProps = PropsWithChildren<{
  title: string
}>
NativeAppEventEmitter.addListener('receiveRemoteNotification', notification => {
  //Android的消息类型为payload 透传消息 或者 cmd消息
  switch (notification.type) {
    case 'cid':
      //  console.log("receiveRemoteNotification cid = " + notification.cid)
      Alert.alert('初始化获取到cid', JSON.stringify(notification))
      break
    case 'payload':
      Alert.alert('payload 消息通知', JSON.stringify(notification))
      break
    case 'cmd':
      Alert.alert('cmd 消息通知', 'cmd action = ' + notification.cmd)
      break
    case 'notificationArrived':
      Alert.alert('notificationArrived 通知到达', JSON.stringify(notification))
      break
    case 'notificationClicked':
      Alert.alert('notificationArrived 通知点击', JSON.stringify(notification))
      break
    default:
  }
})
NativeAppEventEmitter.addListener('clickRemoteNotification', notification => {
  Alert.alert('点击通知', JSON.stringify(notification))
})
const styles = EStyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    height: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: 'bold',
  },
})
function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  )
}

const Getuic = () => {
  const store = geTuiStore()

  const handleTurnOn = () => {
    Getui.turnOnPush()
  }

  const handleTurnOff = () => {
    Getui.turnOffPush()
  }
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }
  return (
    <View style={backgroundStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <View>
          <Button title="turnOn" onPress={handleTurnOn} />
          <Button title="turnOff" onPress={handleTurnOff} />
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <Section title="Version">
            <Text style={styles.highlight}>{store.version}</Text>
          </Section>
          <Section title="ClientId">
            <Text style={styles.highlight}>{store.clientId}</Text>
          </Section>
          <Section title="运行状态">
            <Text style={styles.highlight}>{store.status}</Text>
          </Section>
        </View>
      </ScrollView>
    </View>
  )
}

export default Getuic
