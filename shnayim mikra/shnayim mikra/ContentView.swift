//
//  ContentView.swift
//  shnayim mikra
//
//  Created by Shersheial Borisute on 12/7/21.
//

import SwiftUI

struct ContentView: View {
    let url = Bundle.main.url(forResource: "index", withExtension: "html")!

    var body: some View {
        let model = WebViewModel(_url: url)
        WebView(webView: model.webView)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
