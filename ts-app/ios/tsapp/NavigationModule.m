#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NavigationModule, NSObject)

RCT_EXTERN_METHOD(close:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end 