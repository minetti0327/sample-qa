export default {
  methods: {
    removeErrors() {
      this.$validator.reset();
      this.$store.commit("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    busy() {
      return this.$store.getters.busy;
    },
    jobDone() {
      return this.$store.getters.jobDone;
    },
    isLogin() {
      const loggedIn = this.$store.getters.loginStatus;
      if (loggedIn) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    jobDone(value) {
      if (value) {
        this.$store.commit("setJobDone", false);
        this.jobsDone();
      }
    }
  }
};
