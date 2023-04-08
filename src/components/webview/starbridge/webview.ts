import type { WebView } from 'react-native-webview'

import type { SafeAny } from './interface'

export type WebviewRef = React.RefObject<WebView<SafeAny>>

let webviewRef: WebviewRef

export const getWebview = () => webviewRef?.current

export const setWebview = (v: WebviewRef) => {
  webviewRef = v
}

export const postMessage = (
  callbackId: string,
  data: {
    data?: SafeAny
    code: number
    msg?: string
  },
) => {
  webviewRef?.current?.injectJavaScript(
    `(function(){ var p = window['${callbackId}']; if(p){p(${JSON.stringify(
      data,
    )})} })();`,
  )
}
