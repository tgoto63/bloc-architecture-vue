# bloc-architecture-vue

## BLoC is 何
- BLoCは複数の環境でアプリケーションを開発するときのコードシェアカバレッジを高めるためのリファクタリング指針

### 具体的には、以下の制約を課す。（ルールに従う限りその他の実装は自由らしい）
- 入力・出力インターフェースはすべてStream/Sink
- 依存は必ずInjectableで、環境に依存しない
- 環境ごとの条件分岐は持たない(`if env === web` 的な)

持続可能なアプリケーションを開発するにはどうすればよいのか？
- フレームワークに依存・独立する部分を明確に分ける。
  - *.vue -> Vueに依存する部分(View(Presentational Component / Container Component))
  - *-bloc/ -> 依存しない部分(Domain Logic)
    - ドメインロジックはこちらにまとめて、Viewへinject可能の状態にする
      - なぜinject可能な状態にするのか？
        - blocは複数環境でのコードシャアカバレッジを高めることを1つの目的にしているので、viewが依存しないように

- Angular の Service に似ている🤔

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
