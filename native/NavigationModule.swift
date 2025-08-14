import Foundation
import React
import UIKit
import SwiftUI

@objc(NavigationModule)
class NavigationModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
    
    // Вспомогательный метод для поиска UINavigationController
    private func findNavigationController(in viewController: UIViewController) -> UINavigationController? {
      // Проверяем, является ли сам viewController UINavigationController
      if let navController = viewController as? UINavigationController {
        return navController
      }
      
      // Проверяем дочерние view controllers
      for child in viewController.children {
        if let navController = findNavigationController(in: child) {
          return navController
        }
      }
      
      // Проверяем presented view controller
      if let presented = viewController.presentedViewController {
        return findNavigationController(in: presented)
      }
      
      return nil
    }
  
  @objc
  func close(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            // Находим текущий UIViewController
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                if let window = windowScene.windows.first {
                    if let rootViewController = window.rootViewController {
                        // Сначала проверяем, есть ли presented view controller (для .sheet)
                        if let presentedVC = rootViewController.presentedViewController {
                            // Если это sheet, закрываем его
                            presentedVC.dismiss(animated: true) {
                                resolve(true)
                            }
                            return
                        }
                        
                        // Если нет presented, ищем UINavigationController (для NavigationLink)
                        if rootViewController is UIHostingController<AnyView> || 
                           String(describing: type(of: rootViewController)).contains("UIHostingController") {
                            // Ищем UINavigationController среди дочерних view controllers
                            if let navigationController = self.findNavigationController(in: rootViewController) {
                                navigationController.popViewController(animated: true)
                                resolve(true)
                            } else {
                                reject("ERROR", "UINavigationController не найден", nil)
                            }
                        } else {
                            reject("ERROR", "Неподдерживаемый тип root view controller", nil)
                        }
                    } else {
                        reject("ERROR", "Не найден root view controller", nil)
                    }
                } else {
                    reject("ERROR", "Не найдено окно", nil)
                }
            } else {
                reject("ERROR", "Не найдена windowScene", nil)
            }
        }
    }
} 
