import type { WebViewMessageEvent } from 'react-native-webview'

import { parseEvent } from './helper'
import type { OnMessageEvent, StarbridgeModule } from './interface'
import type { WebviewRef } from './webview'
import { setWebview } from './webview'

export { default as injectedJavaScript } from './injected-java-script'
export { ModuleNavigation } from './modules/navigation'
export { ModuleOrientation } from './modules/orientation'
export { ModuleStatusBar } from './modules/status-bar'

export const compose =
  (...rest: StarbridgeModule[]) =>
  (event: WebViewMessageEvent, webviewRef: WebviewRef) => {
    // 更新 webview 实例
    setWebview(webviewRef)

    const DATA: OnMessageEvent = JSON.parse(event.nativeEvent.data)

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('DATA -=> ', JSON.stringify(DATA))
    }

    if (DATA.event) {
      const eventObject = parseEvent(DATA.event)
      const MODULE_DATA: OnMessageEvent = {
        ...DATA,
        event: eventObject.event,
      }

      rest?.forEach(module => {
        if (module.name === eventObject.module) {
          module.apply(MODULE_DATA)
        }
      })
    }
  }

export const APPLICATION_NAME_FOR_USER_AGENT = 'starbridge'
