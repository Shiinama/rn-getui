#import "AppDelegate.h"
#import <React/RCTBridge.h>

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // 接入个推
	[GeTuiSdk startSdkWithAppId:kGtAppId appKey:kGtAppKey appSecret:kGtAppSecret delegate:[RCTGetuiModule sharedGetuiModule] launchingOptions:launchOptions];
  // APNs
  [GeTuiSdk registerRemoteNotification: (UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge)];

  self.moduleName = @"AwesomeTSProject";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  // [ GTSDK ]：（新版）向个推服务器注册deviceToken
  [GeTuiSdk registerDeviceTokenData:deviceToken];
  // [ 测试代码 ] 日志打印DeviceToken
  NSLog(@"[ TestDemo ] [ DeviceToken(NSData) ]: %@\n\n", deviceToken);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}


@end
