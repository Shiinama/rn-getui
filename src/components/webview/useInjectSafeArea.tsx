import type { EdgeInsets } from 'react-native-safe-area-context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export type InjectSafeAreaType = (hasSafeArea?: boolean) => {
  injectedJavaScript: string
  insets: EdgeInsets
}
const useInjectSafeArea: InjectSafeAreaType = hasSafeArea => {
  const insets = useSafeAreaInsets()
  // 注入路由监听函数
  // 注入安全距离的css 变量
  const injectedJavaScript = `
  (function(){
    document.documentElement.style.setProperty('--sat', "${insets.top}px")
    document.documentElement.style.setProperty('--sar', "${insets.right}px")
    document.documentElement.style.setProperty('--sab', "${insets.bottom}px")
    document.documentElement.style.setProperty('--sal', "${insets.left}px")
  })();`

  return {
    injectedJavaScript,
    insets: hasSafeArea ? insets : { top: 0, right: 0, bottom: 0, left: 0 },
  }
}

export default useInjectSafeArea
