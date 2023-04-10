#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#if __has_include(<RCTGetuiModule/RCTGetuiModule.h>)
#import <RCTGetuiModule/RCTGetuiModule.h>
#elif __has_include("RCTGetuiModule.h")
#import "RCTGetuiModule.h"
#elif __has_include(<GtSdkRN/RCTGetuiModule.h>)
#import <GtSdkRN/RCTGetuiModule.h>
#endif
#define kGtAppId @"THlKAXqZwA8l79tz1lK9A5"
#define kGtAppKey @"V74xmxgf0d8Xkg3IkHTIx1"
#define kGtAppSecret @"LWHJFUJsWe5QpAgF9nsg48"
@interface AppDelegate : RCTAppDelegate<UNUserNotificationCenterDelegate, GeTuiSdkDelegate>

@end
