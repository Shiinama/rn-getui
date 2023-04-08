import { useNavigation, useRoute } from '@react-navigation/native'
import type { FC } from 'react'
import { useLayoutEffect } from 'react'
import { Platform } from 'react-native'
// import VersionNumber from 'react-native-version-number'
import type { WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes'

import CustomWebView from '@/components/webview'
import useStatusBar from '@/hooks/useStatusBar'
import type { RootStackScreenProps } from '@/router'

export interface WebViewPageProps {}
const WebViewPage: FC<WebViewPageProps> = () => {
  const { params = {} } = useRoute<RootStackScreenProps<'WEBVIEW_PAGE'>['route']>()
  const { hasHeader = true, statusBarStyle = 'dark-content', source, ...webViewProps } = params
  useStatusBar(statusBarStyle, true)
  const navigation = useNavigation()
  /** header是否存在 */
  useLayoutEffect(() => {
    setTitle?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, hasHeader])
  const setTitle = (title?: string) => {
    if (hasHeader) {
      navigation.setOptions({ title })
    } else {
      navigation.setOptions({ header: () => null })
    }
  }
  return (
    <CustomWebView
      onNavigationStateChange={event => {
        setTitle?.(event?.title)
      }}
      {...webViewProps}
      source={
        (source as WebViewSourceUri)?.uri
          ? {
              ...source,
              headers: {
                'Cache-Control': 'no-cache',
                ...(Platform.OS === 'ios'
                  ? {
                      appversioncode: 1,
                    }
                  : {}),
                ...(source as WebViewSourceUri).headers,
              },
            }
          : source
      }
    />
  )
}
export default WebViewPage
