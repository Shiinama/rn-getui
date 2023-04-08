import Orientation, { OrientationType } from 'react-native-orientation-locker'

import type { OnMessageEvent, StarbridgeModule } from '../interface'
import { postMessage } from '../webview'

export class ModuleOrientation implements StarbridgeModule {
  public name = 'ORIENTATION'

  public apply = (event: OnMessageEvent) => {
    switch (event.event) {
      case 'lockTo':
        this.lockTo(event.data as OrientationType, event.callbackId)
        break

      default:
        break
    }
  }

  private lockTo = (orientation: OrientationType, callbackId = '') => {
    const onChange = (data: OrientationType) => {
      // 当调用 lockTo Xxx 的时候就会触发回调，在这里不断触发是否获取到了正确的方向

      const doCheck = () => {
        Orientation.getOrientation(d => {
          if (d !== data) {
            setTimeout(doCheck, 200)
          } else {
            postMessage(callbackId, {
              code: 200,
              data,
            })
          }
        })
      }

      doCheck()

      Orientation.removeLockListener(onChange)
    }

    Orientation.addLockListener(onChange)

    switch (orientation) {
      case OrientationType.PORTRAIT:
        Orientation.lockToPortrait()
        break
      case OrientationType['LANDSCAPE-LEFT']:
        Orientation.lockToLandscapeLeft()
        break
      case OrientationType['LANDSCAPE-RIGHT']:
        Orientation.lockToLandscapeRight()
        break

      default: {
        Orientation.removeLockListener(onChange)
        postMessage(callbackId, {
          code: 500,
          msg: '无可旋转的方向',
        })
        break
      }
    }
  }
}
