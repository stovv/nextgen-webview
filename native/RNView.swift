//
//  RNView.swift
//  native
//
//  Created by Данила  on 8/12/25.
//

import SwiftUI

struct RNView: View {
    let url: String;
    var body: some View {
        ReactNativeView(url: url)
            .ignoresSafeArea()
    }
    
}


struct ReactNativeView: UIViewControllerRepresentable {
    let url: String

    func makeUIViewController(context: Context) -> ReactViewController {
        return ReactViewController(url: url)
    }

    func updateUIViewController(_ uiViewController: ReactViewController, context: Context) {
        // Updates can be handled here if needed
    }
}


#Preview {
    RNView(url: "https://dcbb16ab-e834-4145-94a3-e663f1144c76.selstorage.ru/index-4feb8f789cee8744d9724f26e008f717.hbc")
}
