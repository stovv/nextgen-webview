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
            print("Close! Начинаем процесс закрытия...")
            
            // Находим текущий UIViewController
            if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene {
                if let window = windowScene.windows.first {
                    if let rootViewController = window.rootViewController {
                        print("✅ Найден root view controller: \(type(of: rootViewController))")
                        
                        // Сначала проверяем, есть ли presented view controller (для .sheet)
                        if let presentedVC = rootViewController.presentedViewController {
                            print("🎯 Найден presented view controller (sheet): \(type(of: presentedVC))")
                            
                            // Если это sheet, закрываем его
                            presentedVC.dismiss(animated: true) {
                                print("✅ Sheet закрыт")
                                resolve(true)
                            }
                            return
                        }
                        
                        // Если нет presented, ищем UINavigationController (для NavigationLink)
                        if rootViewController is UIHostingController<AnyView> || 
                           String(describing: type(of: rootViewController)).contains("UIHostingController") {
                            print("🎯 Это UIHostingController, ищем навигацию...")
                            
                            // Ищем UINavigationController среди дочерних view controllers
                            if let navigationController = self.findNavigationController(in: rootViewController) {
                                print("✅ Найден UINavigationController, возвращаемся назад")
                                navigationController.popViewController(animated: true)
                                resolve(true)
                            } else {
                                print("❌ UINavigationController не найден")
                                reject("ERROR", "UINavigationController не найден", nil)
                            }
                        } else {
                            print("❌ Это НЕ UIHostingController")
                            reject("ERROR", "Неподдерживаемый тип root view controller", nil)
                        }
                    } else {
                        print("❌ Не найден root view controller")
                        reject("ERROR", "Не найден root view controller", nil)
                    }
                } else {
                    print("❌ Не найдено окно")
                    reject("ERROR", "Не найдено окно", nil)
                }
            } else {
                print("❌ Не найдена windowScene")
                reject("ERROR", "Не найдена windowScene", nil)
            }
        }
    }
} 
