# ベースイメージとしてNode.jsを指定
FROM node:16

# アプリケーションの作業ディレクトリを設定
WORKDIR /app

# アプリケーションの依存ファイルをコンテナ内にコピー
COPY yarn.lock ./

# 依存関係のインストール
RUN yarn install

# アプリケーションのソースコードをコンテナ内にコピー
COPY . ./

# アプリケーションのビルド
RUN yarn build

# 本番モードでReactアプリケーションを起動するためのサーバーをインストール
RUN yarn global add serve

# アプリケーションの起動
CMD ["serve", "-s", "build"]
