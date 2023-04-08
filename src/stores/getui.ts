import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import config from '@/config'
import Getui from 'react-native-getui'

export interface GetuiState {
  clientId: string
  version: string
  status: string
}

export const name = 'getui-store'
const updateComponentInfo = () => {
  let getuiBaseParam = {
    clientId: '',
    version: '',
    status: '',
  }
  Getui.clientId((param: string) => {
    console.log(param, 'clientId')
    getuiBaseParam.clientId = param
  })

  Getui.version((param: string) => {
    getuiBaseParam.version = param
  })

  Getui.status((param: string) => {
    let status = ''
    switch (param) {
      case '0':
        status = '正在启动'
        break
      case '1':
        status = '启动'
        break
      case '2':
        status = '停止'
        break
    }
    getuiBaseParam.status = status
  })
  return getuiBaseParam
}
const geTuiStore = create(
  persist<GetuiState>(() => updateComponentInfo(), {
    storage: createJSONStorage(() => AsyncStorage),
    name: config.storageKey,
  })
)

export default geTuiStore
