# Пример работы RN внутри существующего нативного приложения

[RN Integrating in exists app](https://reactnative.dev/docs/integration-with-existing-apps)

Вне гайда немногоизменена структура

Привычная структуда для RN проекта

```
/app
  /ios - проект для ios
  /android - проект для android
  /src - js/ts сорцы RN
  package.json
```

В этом примере, ios/android/RN разные репозитории

```
/native - репозиторий ios
  Podfile
  package.json
/ts-app - репозиторий RN
```

Из-за этого Podfile изменены пути до node_modules и пропатчен пакет expo-constants


## Нативный модуль

В проекте реализован нативный модуль `NavigationModule` с одним методом, который закрывает RNView.
RNView с навигацией при помощи `react-navigation` не знает ничего об предыдущем стеке/табах, поэтому чтобы иметь возможность
закрывать RNView и возвращаться на предыдущий экран был реализован метод `close`
(реализация на коленке, можно было наверно решить это проще)


