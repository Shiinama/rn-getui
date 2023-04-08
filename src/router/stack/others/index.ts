import { CardStyleInterpolators } from '@react-navigation/stack'
import type { StatusBarStyle } from 'react-native'

import type { CustomWebViewProps } from '@/components/webview'
import Webview from '@/pages/webview'
import type { IRouteConfig } from '@/router/typing'

export type OthersStackParamList = {
  WEBVIEW_PAGE: CustomWebViewProps & {
    hasHeader?: boolean
    statusBarStyle?: StatusBarStyle
  }
  LOGIN: null
}

type OthersStackName = keyof OthersStackParamList

const routes: IRouteConfig<OthersStackName>[] = [
  {
    name: 'WEBVIEW_PAGE',
    component: Webview,
    options: {
      // headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    },
  },
]

export default routes
