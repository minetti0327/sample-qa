export const state = () => ({
  user: null,
  error: null,
  busy: false,
  jobDone: false
});

export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setBusy(state, payload) {
    state.busy = payload;
  },
  setJobDone(state, payload) {
    state.jobDone = payload;
  }
};

export const actions = {
  signUpUser({ commit }, payload) {
    commit("setBusy", true);
    commit("clearError");
    let newUser = null;
    // 新規ユーザーの登録(firestoreのauth)
    const db = this.$fireApp.firestore();
    this.$fireApp
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        newUser = data.user;
        return data.user.updateProfile({ displayName: payload.displayName }).then(() => {
          const authUser = {
            id: data.user.uid,
            email: data.user.email,
            name: data.user.displayName
          };
          commit("setUser", authUser);
          commit("setJobDone", true);
          commit("setBusy", false);
        });
      })
      .then(() => {
        // ユーザーをデータベースに登録(主にデータ⽤)
        let userRef = db.collection("users").doc(newUser.uid);
        return userRef.set({
          email: payload.email,
          name: payload.displayName,
          createdAt: new Date().toISOString()
        });
      })
      .catch(error => {
        commit("setBusy", false);
        commit("setError", error);
      });
  },
  loginUser({ commit }, payload) {
    commit("setBusy", true);
    commit("clearError");
    this.$fireApp
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        const authUser = {
          id: data.user.uid,
          email: data.user.email,
          name: data.user.displayName
        };
        commit("setUser", authUser);
        commit("setJobDone", true);
        commit("setBusy", false);
      })
      .catch(error => {
        commit("setBusy", false);
        commit("setError", error);
      });
  },
  logOut({ commit }) {
    this.$fireApp.auth().signOut();
    commit("setUser", null);
  }
};

export const getters = {
  user(state) {
    return state.user;
  },
  loginStatus(state) {
    return state.user !== null && state.user !== undefined;
  },
  error(state) {
    return state.error;
  },
  busy(state) {
    return state.busy;
  },
  jobDone(state) {
    return state.jobDone;
  }
};
