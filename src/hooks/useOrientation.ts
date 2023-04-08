import { useSetState } from 'ahooks'
import { useEffect } from 'react'
import Orientation, {
  OrientationType,
  useDeviceOrientationChange,
  useOrientationChange,
} from 'react-native-orientation-locker'

export { OrientationType }

interface OrientationParams {
  /**
   * 目标锁定方向
   */
  targetOrientation: OrientationType
  /**
   * 页面卸载后是否还原成前一个状态
   */
  reset?: boolean
}

const OrientationTypeMethodMap = {
  [OrientationType.PORTRAIT]: Orientation.lockToPortrait,
  [OrientationType['LANDSCAPE-LEFT']]: Orientation.lockToLandscapeLeft,
  [OrientationType['LANDSCAPE-RIGHT']]: Orientation.lockToLandscapeRight,
  [OrientationType['PORTRAIT-UPSIDEDOWN']]:
    Orientation.lockToPortraitUpsideDown,
}

interface ICurrentOri {
  uiOrientation: string
  deviceOrientation: string
}

/**
 * 键盘展开收起自定义事件监听的hooks
 * @param param0 onShow or onDismiss
 */
const useOrientation = ({
  targetOrientation,
  reset = true,
}: Partial<OrientationParams>) => {
  const [orientation, setOrientation] = useSetState<ICurrentOri>({
    uiOrientation: '',
    deviceOrientation: '',
  })
  useDeviceOrientationChange(ori => {
    // 响应设备的方向变化
    setOrientation({
      deviceOrientation: ori,
    })
  })
  useOrientationChange(ori => {
    // 当UI方向变化，lock后不会响应变化
    setOrientation({
      uiOrientation: ori,
    })
  })
  useEffect(() => {
    const ori = OrientationTypeMethodMap[targetOrientation]
    if (ori) {
      ori()
    }
    return () => {
      if (reset) {
        Orientation.unlockAllOrientations()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetOrientation])
  return orientation
}

export default useOrientation
