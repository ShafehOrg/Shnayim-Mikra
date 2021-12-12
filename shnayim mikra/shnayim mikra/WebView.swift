//
//  WebView.swift
//  shnayim mikra
//
//  Created by Shersheial Borisute on 12/7/21.
//

import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    typealias UIViewType = WKWebView

    let webView: WKWebView
    
    func makeUIView(context: Context) -> WKWebView {
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) { }
}

class WebViewModel: ObservableObject {
    let webView: WKWebView
    var url: URL
    
    init(_url: URL) {
        webView = WKWebView(frame: .zero)
        url = _url

        loadUrl()
    }
    
    func loadUrl() {
        webView.load(URLRequest(url: url))
    }
}


struct WebView_Previews: PreviewProvider {
    static var previews: some View {
        WebView(webView: WKWebView())
    }
}
