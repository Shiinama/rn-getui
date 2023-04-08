import { useState } from 'react'
import { StatusBar } from 'react-native'
import type { WebViewMessageEvent } from 'react-native-webview'

import useOrientation, { OrientationType } from '@/hooks/useOrientation'

export type UseWebViewOrientationType = () => {
  onMessage: (e: WebViewMessageEvent) => void
  ori: OrientationType
}
let entry = null
const useWebViewOrientation: UseWebViewOrientationType = () => {
  const [ori, setOri] = useState<OrientationType>(OrientationType.PORTRAIT)
  useOrientation({ targetOrientation: ori, reset: false })
  const onMessage = (e: WebViewMessageEvent) => {
    if (!e?.nativeEvent?.data) {
      return false
    } else {
      try {
        const { type } = JSON.parse(e?.nativeEvent?.data)
        switch (type) {
          case 'enterLandscape':
            entry = StatusBar.pushStackEntry({ hidden: true })
            setOri(OrientationType['LANDSCAPE-LEFT'])
            break
          case 'exitLandscape':
            StatusBar.popStackEntry(entry)
            setOri(OrientationType.PORTRAIT)
            break
          default:
            break
        }
      } catch (error) {}
    }
  }
  return { onMessage, ori }
}

export default useWebViewOrientation
