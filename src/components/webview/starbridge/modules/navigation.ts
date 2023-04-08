import type { StackScreenProps } from '@react-navigation/stack'

import type { SafeAny, OnMessageEvent, StarbridgeModule } from '../interface'

type NavigationType = StackScreenProps<SafeAny>['navigation']

export class ModuleNavigation implements StarbridgeModule {
  public name = 'NAVIGATION'

  private navigation: NavigationType

  public constructor(navigation: NavigationType) {
    this.navigation = navigation
  }

  public apply = (event: OnMessageEvent) => {
    switch (event.event) {
      case 'goBack':
        this.navigation?.goBack()
        break

      case 'popToTop':
        this.navigation?.popToTop()
        break

      case 'pop':
        this.navigation?.pop(event.data as number)
        break

      case 'navigate': {
        const { path, params } = event.data as { path: string; params?: object }
        this.navigation?.navigate(path, params)
        break
      }

      case 'replace': {
        const { path, params } = event.data as { path: string; params?: object }
        this.navigation?.replace(path, params)
        break
      }

      case 'push': {
        const { path, params } = event.data as { path: string; params?: object }
        this.navigation?.push(path, params)
        break
      }

      default:
        break
    }
  }
}
