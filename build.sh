# 前回ビルドで作成されたフォルダ群を一度全て削除
rm -rf .nuxt public functions/nuxt

# publicフォルダを作成
mkdir public

# nuxtをbuildする
npm run build

# 各種フォルダのコピー
cp -R .nuxt functions/nuxt
cp -R .nuxt/dist/client public/assets
# ↓ここは今回必須ではないですが、読み込みたい画像があればapp/staticもマージします。
cp -R app/static/* public/assets