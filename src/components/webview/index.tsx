import { Progress } from '@fruits-chain/react-native-xiaoshu'
import { useNavigation } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { FC } from 'react'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { View } from 'react-native'
import { OrientationType } from 'react-native-orientation-locker'
import type { WebViewMessageEvent, WebViewProps } from 'react-native-webview'
import { WebView } from 'react-native-webview'

import {
  injectedJavaScript as starbridgeInjectedJavaScript,
  APPLICATION_NAME_FOR_USER_AGENT,
  compose as starbridgeCompose,
  ModuleNavigation,
  ModuleOrientation,
  ModuleStatusBar,
} from './starbridge'
import useGoBack from './useGoBack'
import useInjectSafeArea from './useInjectSafeArea'
import useWebViewOrientation from './useWebViewOrientation'
import WebviewLoading from './webview-loading'

export interface CustomWebViewProps extends Partial<WebViewProps> {
  otherJavaScript?: string
  onOtherMessage?: WebViewProps['onMessage']
  hasSafeArea?: boolean
  onGoBack?: () => void
}

const ModuleOrientationInstance = new ModuleOrientation()
const ModuleStatusBarInstance = new ModuleStatusBar()

const CustomWebView: FC<Partial<CustomWebViewProps>> = props => {
  const {
    otherJavaScript,
    onOtherMessage,
    hasSafeArea,
    onGoBack,
    ...webViewProps
  } = props
  const webViewRef = useRef<WebView>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<StackScreenProps<any>['navigation']>()
  // webview的加载状态
  const [loading, setLoading] = useState(true)
  const [fail, setFail] = useState(false)
  const starbridgeOnMessage = useMemo(
    () =>
      starbridgeCompose(
        new ModuleNavigation(navigation),
        ModuleOrientationInstance,
        ModuleStatusBarInstance,
      ),
    [navigation],
  )
  // 返回逻辑
  const { injectedJavaScript: goBackJavaScript, onMessage: onGoBackMessage } =
    useGoBack({
      webViewRef,
      onGoBack,
    })
  // 注入安全区距离
  const { injectedJavaScript: safeAreaJavaScript, insets } =
    useInjectSafeArea(hasSafeArea)
  // 横屏操作
  const { onMessage: onOrientationMessage } = useWebViewOrientation()
  // 统一message处理
  const onMessage = (e: WebViewMessageEvent) => {
    onGoBackMessage(e)
    onOrientationMessage(e)
    onOtherMessage?.(e)
    starbridgeOnMessage(e, webViewRef)
  }
  // 注入的js
  const injectedJavaScript = `${goBackJavaScript}
  ${safeAreaJavaScript}
  ${otherJavaScript}
  ${starbridgeInjectedJavaScript}`

  useEffect(() => {
    return () => {
      ModuleStatusBarInstance.apply({
        event: 'setHidden',
        data: {
          hidden: false,
        },
      })
      ModuleOrientationInstance.apply({
        event: 'lockTo',
        data: OrientationType.PORTRAIT,
      })
    }
  }, [])

  return (
    <Progress.Page
      syncRenderChildren
      backgroundColor="#ECEEF1"
      extraLoading={<WebviewLoading />}
      loading={loading}
      fail={fail}
      onPressReload={() => {
        setFail(false)
        webViewRef.current?.reload()
      }}>
      <View style={{ paddingTop: insets?.top }} />
      <WebView
        ref={webViewRef}
        onLoadEnd={() => {
          setLoading(false)
        }}
        injectedJavaScript={injectedJavaScript}
        onMessage={onMessage}
        allowFileAccess
        onError={() => {
          setFail(true)
        }}
        originWhitelist={['*']}
        javaScriptEnabled
        domStorageEnabled
        allowUniversalAccessFromFileURLs
        bounces={false}
        keyboardDisplayRequiresUserAction={false}
        {...webViewProps}
        applicationNameForUserAgent={[
          APPLICATION_NAME_FOR_USER_AGENT,
          'starbridge-kiwi',
          webViewProps.applicationNameForUserAgent,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    </Progress.Page>
  )
}

export default CustomWebView
