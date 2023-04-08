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

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <XiaoshuProvider>
        <Router />
      </XiaoshuProvider>
    </SafeAreaProvider>
  )
}

export default App
