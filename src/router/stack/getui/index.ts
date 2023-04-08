import type { WebViewProps } from 'react-native-webview'

import type { IRouteConfig } from '@/router/typing'

export type GetuiStackParamList = {
  GETUI_CHANGE_PASSWORD: WebViewProps & { hasHeader?: boolean }
}

type GetuiStackName = keyof GetuiStackParamList

const routes: IRouteConfig<GetuiStackName>[] = [
  // {
  //   name: 'GETUI_CHANGE_PASSWORD',
  //   component: GetuiChangePassword,
  //   options: {
  //     title: '修改密码',
  //     headerShown: false,
  //     cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  //   },
  // },
]

export default routes
