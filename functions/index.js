const functions = require("firebase-functions");
const express = require("express");
const { Nuxt } = require("nuxt"); // ビルドしたnuxtプロジェクト

const app = express();
const config = {
  dev: false,
  buildDir: "nuxt",
  publicPath: "/assets/"
};
const nuxt = new Nuxt(config);
app.use(nuxt.render); // expressのミドルウェア関数に登録
exports.ssr = functions.https.onRequest(app); // ssrという名前でエクスポート(あとでfirebase.jsonに記載する名称)
