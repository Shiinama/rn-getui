import RNConfig from 'react-native-config'

const config = {
  baseUrl: '/',
  /**
   * iOS 应用 appleId
   * @description 用于跳转到 App Store 应用详情页
   */
  appleId: 0,
  authKey: 'Authorization',
  storageKey: 'XingZhan',
  /** 业务系统 id */
  appId: 10,
}
export default {
  ...config,
  HOST: RNConfig.HOST,
  UPLOAD_HOST: RNConfig.UPLOAD_HOST,
  H5_URL: RNConfig.H5_URL,
  LOGIN_HOST: RNConfig.LOGIN_HOST,
  COMMON_HOST: RNConfig.COMMON_HOST,
}
