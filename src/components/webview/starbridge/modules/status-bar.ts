import type { StatusBarAnimation } from 'react-native'
import { StatusBar } from 'react-native'

import type { OnMessageEvent, StarbridgeModule } from '../interface'

export class ModuleStatusBar implements StarbridgeModule {
  public name = 'STATUS_BAR'

  public apply = (event: OnMessageEvent) => {
    switch (event.event) {
      case 'setHidden': {
        const { hidden, animation } = event.data as {
          hidden: boolean
          animation?: StatusBarAnimation
        }

        StatusBar.setHidden(hidden, animation)
        break
      }

      default:
        break
    }
  }
}
