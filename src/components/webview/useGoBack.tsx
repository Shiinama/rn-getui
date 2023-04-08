import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import type { WebViewMessageEvent, WebView } from 'react-native-webview'
export type UseGoBackType = (option: {
  webViewRef: React.RefObject<WebView>
  onGoBack?: () => void
}) => {
  injectedJavaScript: string
  onMessage: (e: WebViewMessageEvent) => void
}
const useGoBack: UseGoBackType = ({ webViewRef, onGoBack }) => {
  const navigation = useNavigation()
  // 注入路由监听函数
  const injectedJavaScript = `
  (function(){
    window.addEventListener('popstate', function(e) {
      
      window.ReactNativeWebView.postMessage(JSON.stringify({type:'popstate',data:e}));
    })
    var _wr = function(type) {
      var orig = history[type];
      return function() {
          var rv = orig.apply(this, arguments);
         var e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
      };
   };
    history.pushState = _wr("pushState");
    history.replaceState = _wr("replaceState");
    window.addEventListener('pushState', function(e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({type:'pushState',data:e}));
    });
    window.addEventListener('replaceState', function(e) {
      window.ReactNativeWebView.postMessage(JSON.stringify({type:'replaceState',data:e}));
    });
  })();`
  // 是否能返回
  const [canGoBack, setCanGoBack] = useState(false)
  const isFocused = useIsFocused()
  useLayoutEffect(() => {
    // Android 物理返回按钮
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isFocused) {
          if (canGoBack) {
            webViewRef.current?.goBack()
          } else {
            navigation.goBack()
            onGoBack?.()
          }
          return true
        } else {
          return false
        }
      },
    )

    return () => {
      backHandler.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, canGoBack, navigation])
  // 监听路由变化设置是否能返回状态
  const onMessage = (e: WebViewMessageEvent) => {
    if (!e?.nativeEvent?.data) {
      return false
    } else {
      try {
        const { type } = JSON.parse(e?.nativeEvent?.data)
        switch (type) {
          case 'popstate':
          case 'pushState':
          case 'replaceState':
            setCanGoBack(e?.nativeEvent?.canGoBack)
            break
          case 'exit':
            navigation.goBack()
            onGoBack?.()
            break
          default:
            break
        }
      } catch (error) {}
    }
  }
  return { injectedJavaScript, onMessage }
}

export default useGoBack
