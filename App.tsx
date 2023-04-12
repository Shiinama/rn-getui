/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import '@/assets/custom-components-config'
import '@/assets/custom-theme'
import { Provider as XiaoshuProvider } from '@fruits-chain/react-native-xiaoshu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import Router from '@/router'
import { NativeModules, NativeAppEventEmitter, NativeEventEmitter } from 'react-native'
const { GetuiBridgeTools } = NativeModules

function App(): JSX.Element {
  // "GeTuiSdkDidRegisterClient",
  // "GeTuiSDkDidNotifySdkState",
  // "GeTuiSdkDidOccurError",
  // "GetuiSdkGrantAuthorization",
  // "GeTuiSdkwillPresentNotification",
  // "GeTuiSdkDidReceiveNotification",
  // "GeTuiSdkDidReceiveSlience",
  // "GeTuiSdkOpenSettingsForNotification",
  // "GeTuiSdkDidSendMessage",
  // "GeTuiSdkDidSetPushMode",
  // "GeTuiSdkDidAlias",
  // "GeTuiSdkDidSetTags",
  // "GetuiSdkDidQueryTag",
  // "voipPushPayload"
  const myEmitter = new NativeEventEmitter(GetuiBridgeTools)
  NativeAppEventEmitter.addListener('GeTuiSdkDidReceiveNotification', res => {
    console.log(res, 1111)
  })
  myEmitter.addListener('GeTuiSdkDidReceiveSlience', res => {
    console.log(res, 222)
  })
  return (
    <SafeAreaProvider>
      <XiaoshuProvider>
        <Router />
      </XiaoshuProvider>
    </SafeAreaProvider>
  )
}

export default App
