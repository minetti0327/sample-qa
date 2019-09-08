import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default (context, inject) => {
  let fireApp;
  if (!firebase.apps.length) {
    // 先ほどコンソールでコピーしたコードを貼り付け
    fireApp = firebase.initializeApp({
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    });
  } else {
    fireApp = firebase.app();
  }
  inject("fireApp", fireApp);
};
