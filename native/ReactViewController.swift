import UIKit
import React
import Expo
import ReactAppDependencyProvider
import React_RCTAppDelegate

final class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
    private let bundleUrl: URL

    init(bundleUrl: URL) {
        self.bundleUrl = bundleUrl
        super.init()
    }

    override func bundleURL() -> URL? {
        return bundleUrl
    }
}

class ReactViewController: UIViewController {
    private var url: String
    private var reactNativeFactory: RCTReactNativeFactory?
    private var reactNativeFactoryDelegate: ReactNativeDelegate?

    init(url: String) {
        RCTDevLoadingView.setEnabled(false)
        self.url = url
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        RCTDevLoadingView.setEnabled(false)
        self.url = ""
        super.init(coder: coder)
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        guard let jsBundleLocation = URL(string: url) else {
            assertionFailure("Invalid JS bundle URL: \(url)")
            return
        }

        let delegate = ReactNativeDelegate(bundleUrl: jsBundleLocation)
        delegate.dependencyProvider = RCTAppDependencyProvider()
        let factory = RCTReactNativeFactory(delegate: delegate)

        self.reactNativeFactoryDelegate = delegate
        self.reactNativeFactory = factory

        /**
         
         let userInfo: [String: Any] = [
             "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0N",
             "name": "Инокентий",
             "lastName": "Филатов"
         ];

         */
        // Создаём RootView через фабрику (совместимо с Fabric / новой архитектурой)
        let rootView = factory.rootViewFactory.view(withModuleName: "main", initialProperties: nil)
        self.view = rootView
    }
}
