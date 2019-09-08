<template>
  <div>
    <section class="section no-top-pad">
      <h5 class="title is-5">マイページ</h5>
      <hr />

      <div class="is-centered is-mobile">
        <div class="box">
          <p>{{user.name}}</p>
          <p>{{user.email}}</p>
        </div>
        <p class="button is-outlined" @click="logOut">ログアウト</p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      if (this.$store.getters.user) {
        return this.$store.getters.user;
      }

      return {
        name: "",
        email: ""
      };
    }
  }
};
</script>