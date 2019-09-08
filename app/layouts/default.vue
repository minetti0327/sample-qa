<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link class="navbar-item" to="/">ホーム</nuxt-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <!-- ここにログインボタンを⼊れる-->
              <nuxt-link v-if="!isLogin" class="button is-light" to="/login">ログイン</nuxt-link>
              <nuxt-link v-else class="button is-light" to="/mypage">{{userName}}さん</nuxt-link>
              <nuxt-link class="button is-primary" to="/signup">
                <strong>アカウント作成</strong>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="main-body">
      <!-- これがページのレンダリング要素-->
      <nuxt />
    </div>
    <footer class="footer">
      <div>
        <div class="content has-text-centered">
          <p>&copy; qaSample</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  created() {
    // pluginsでinjectしたfirebaseは次のように呼び出せます
    // onAuthStateChangedでログイン状態を判定できます
    this.$fireApp.auth().onAuthStateChanged(user => {
      if (user) {
        const authUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName
        };
        this.setUser(authUser);
      }
    });
  },
  computed: {
    isLogin() {
      // テンプレート側でログイン状態を判定したいのでcomputedを作成
      const loggedIn = this.$store.getters.loginStatus;
      console.log(loggedIn);

      if (loggedIn) {
        return true;
      } else {
        return false;
      }
    },
    userName() {
      // storeからのユーザーネーム取得処理
      return this.$store.getters.user ? this.$store.getters.user.name : "";
    }
  },
  methods: {
    ...mapMutations({
      setUser: "setUser"
    })
  }
};
</script>