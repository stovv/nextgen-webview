//
//  ContentView.swift
//  native
//
//  Created by Данила  on 8/5/25.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            // Верхняя панель
            HStack(alignment: .center) {
                Image(systemName: "person.crop.circle")
                    .resizable()
                    .frame(width: 48, height: 48)
                    .padding(.trailing, 8)
                Text("Данила")
                    .font(.title2).bold()
                Spacer()
                Button(action: {}) {
                    Image(systemName: "plus.circle.fill")
                        .resizable()
                        .frame(width: 32, height: 32)
                        .foregroundColor(.gray)
                }
            }
            .padding([.top, .horizontal])
            
            // Блок с текущим счётом и картами
            HStack {
                VStack(alignment: .leading) {
                    Text("Текущий счёт")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                    RoundedRectangle(cornerRadius: 8)
                        .fill(Color(.systemGray6))
                        .frame(height: 32)
                        .overlay(Text("1337 ₽").font(.headline))
                }
                Spacer()
                Image(systemName: "creditcard.fill")
                    .resizable()
                    .frame(width: 48, height: 32)
                    .foregroundColor(.red)
            }
            .padding()
            .background(RoundedRectangle(cornerRadius: 16).fill(Color(.systemGray5)))
            .padding(.horizontal)
            
            // Поиск
            HStack {
                Image(systemName: "magnifyingglass")
                    .foregroundColor(.gray)
                TextField("Поиск по приложению", text: .constant(""))
                Spacer()
                Image(systemName: "qrcode.viewfinder")
                    .foregroundColor(.gray)
            }
            .padding(12)
            .background(RoundedRectangle(cornerRadius: 12).fill(Color(.systemGray6)))
            .padding([.horizontal, .top])
            
            // Блоки с советами
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    AdviceCardView(text: "До 8000 за совет", color: .green)
                    AdviceCardView(text: "Деньги за советы", color: .orange)
                    AdviceCardView(text: "10% кэшбек", color: .green)
                }
                .padding(.horizontal)
            }
            .padding(.top, 8)
            
            // Партнёры с кэшбеком
            VStack(alignment: .leading) {
                Text("Альфа Выгодно")
                    .font(.headline)
                    .padding(.horizontal)
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 24) {
                        PartnerIconView(name: "Тревел", percent: "до 20%", color: .pink, url: "https://dcbb16ab-e834-4145-94a3-e663f1144c76.selstorage.ru/index-299e36cb7a7110b99cd43dfe6651818c.hbc")
                        PartnerIconSheet(name: "Тревел2", percent: "до 20%", color: .pink, url: "https://dcbb16ab-e834-4145-94a3-e663f1144c76.selstorage.ru/index-299e36cb7a7110b99cd43dfe6651818c.hbc")
                        PartnerIconView(name: "Заправки", percent: "до 7%", color: .green, url: "http://localhost:8081/index.bundle?platform=ios")
                        PartnerIconView(name: "Афиша", percent: "до 10%", color: .purple, url: "https://dcbb16ab-e834-4145-94a3-e663f1144c76.selstorage.ru/index-aa85b5a7e7a7b6efa79875e90407f66e.js")
                        PartnerIconView(name: "Страховки", percent: "до 10%", color: .orange, url: "https://dcbb16ab-e834-4145-94a3-e663f1144c76.selstorage.ru/index-aa85b5a7e7a7b6efa79875e90407f66e.js")
                        PartnerIconView(name: "Маркет", percent: "до 40%", color: .blue, url: "https://dcbb16ab-e834-4145-94a3-e663f1144c76.selstorage.ru/index-aa85b5a7e7a7b6efa79875e90407f66e.js")
                    }
                    .padding(.horizontal)
                }
            }
            .padding(.top, 8)
            Spacer()
            // Нижнее меню
            Divider()
            HStack {
                BottomMenuItem(icon: "house.fill", title: "Главный", selected: true)
                BottomMenuItem(icon: "arrow.left.arrow.right", title: "Платежи")
                BottomMenuItem(icon: "heart", title: "Выгода")
                BottomMenuItem(icon: "clock", title: "История")
                BottomMenuItem(icon: "bubble.left", title: "Чаты")
            }
            .padding(.vertical, 8)
        }
        .background(Color(.systemGray6).ignoresSafeArea())
    }
}

struct AdviceCardView: View {
    let text: String
    let color: Color
    var body: some View {
        VStack {
            Spacer()
            Text(text)
                .font(.subheadline)
                .bold()
                .foregroundColor(.black)
            Spacer()
        }
        .frame(width: 140, height: 90)
        .background(color.opacity(0.2))
        .cornerRadius(16)
    }
}

struct PartnerIconView: View {
    @State private var showingReactNative = true

    let name: String
    let percent: String
    let color: Color
    let url: String

    var body: some View {
        NavigationLink(destination: RNView(url: url).navigationBarBackButtonHidden()) {
                    VStack(spacing: 4) {
                        Circle()
                            .fill(color.opacity(0.2))
                            .frame(width: 56, height: 56)
                            .overlay(
                                Text(String(name.prefix(1)))
                                    .font(.title).bold()
                                    .foregroundColor(color)
                            )
                        Text(name)
                            .font(.caption)
                        Text(percent)
                            .font(.caption2)
                            .foregroundColor(.gray)
                    }
                    .frame(width: 70)
                }
                .buttonStyle(PlainButtonStyle()) // Убираем стиль кнопки
    }
}

struct PartnerIconSheet: View {
    @State private var showingReactNative = false

    let name: String
    let percent: String
    let color: Color
    let url: String

    var body: some View {
        VStack(spacing: 4) {
            Circle()
                .fill(color.opacity(0.2))
                .frame(width: 56, height: 56)
                .overlay(Text(String(name.prefix(1))).font(.title).bold().foregroundColor(color))
            Text(name)
                .font(.caption)
            Text(percent)
                .font(.caption2)
                .foregroundColor(.gray)
        }
        .frame(width: 70)
        .onTapGesture {
            showingReactNative = true
        }.sheet(isPresented: $showingReactNative) {
            RNView(url: url).navigationBarBackButtonHidden()
        }
    }
}

struct BottomMenuItem: View {
    let icon: String
    let title: String
    var selected: Bool = false
    var body: some View {
        VStack(spacing: 2) {
            Image(systemName: icon)
                .font(.system(size: 22))
                .foregroundColor(selected ? .black : .gray)
            Text(title)
                .font(.caption2)
                .foregroundColor(selected ? .black : .gray)
        }
        .frame(maxWidth: .infinity)
    }
}

#Preview {
    ContentView()
}
