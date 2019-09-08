export const state = () => ({
  answers: []
});

export const mutations = {
  setAnswersAll(state, payload) {
    state.answers = payload;
  }
};

export const actions = {
  async addAnswer({ commit, state, dispatch }, payload) {
    commit("setBusy", true, { root: true });
    commit("clearError", null, { root: true });
    const db = this.$fireApp.firestore();
    // クエスチョンを登録
    let answerRef = db.collection("answers").doc(payload.questionId);
    let pushData = {};
    let uniqID = this.$uniqStr();
    pushData[uniqID] = {
      id: uniqID,
      title: payload.answer,
      userRef: await db.collection("users").doc(payload.userId),
      createdAt: new Date().toISOString()
    };

    answerRef
      .set({ answer: pushData }, { merge: true })
      .then(() => {
        dispatch("fetchAnswersAll", payload.questionId);
        commit("setBusy", false, { root: true });
        commit("setJobDone", true, { root: true });
      })
      .catch(error => console.log(error));
  },
  async fetchAnswersAll({ commit, state }, questionId) {
    const db = this.$fireApp.firestore();

    // 登録した全データを取得
    let answers = [];
    await db
      .collection("answers")
      .doc(questionId)
      .get()
      .then(doc => {
        if (doc.data() && doc.data().answer) {
          let answerObj = doc.data().answer;
          for (let key of Object.keys(answerObj)) {
            answers.push(answerObj[key]);
          }
        }
      });

    // storeのデータを作成
    let storeData = [];
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      // リレーションデータの取得
      const userQuerySnapshot = await answer.userRef.get();
      const userID = await answer.userRef.id;
      storeData.push({
        title: answer && answer.title,
        id: answer && answer.id,
        createdAt: answer && answer.createdAt,
        user: {
          ...userQuerySnapshot.data(),
          id: userID
        }
      });
    }
    commit("setAnswersAll", storeData);
  },
  async updateAnswer({ commit, state, dispatch }, payload) {
    commit("setBusy", true, { root: true });
    commit("clearError", null, { root: true });
    const db = this.$fireApp.firestore();

    // クエスチョンを登録
    let docRef = await db.collection("answers").doc(payload.questionId);
    await docRef
      .get()
      .then(doc => {
        const data = doc.data().answer;
        data[payload.answerId] = {
          ...data[payload.answerId],
          title: payload.updateText,
          updateAt: new Date().toISOString()
        };
        docRef.update({ answer: data });
      })
      .then(() => {
        console.log("Document successfully remove!");
        commit("setBusy", false, { root: true });
        commit("setJobDone", true, { root: true });
      });

    dispatch("fetchAnswersAll", payload.questionId);
  },
  async removeAnswer({ commit, state, dispatch }, payload) {
    commit("setBusy", true, { root: true });
    commit("clearError", null, { root: true });
    const db = this.$fireApp.firestore();

    // クエスチョンを登録
    let docRef = await db.collection("answers").doc(payload.questionId);
    await docRef
      .get()
      .then(doc => {
        const data = doc.data().answer;
        delete data[payload.answerId];
        docRef.update({ answer: data });
      })
      .then(() => {
        console.log("Document successfully remove!");
        commit("setBusy", false, { root: true });
        commit("setJobDone", true, { root: true });
      });

    dispatch("fetchAnswersAll", payload.questionId);
  }
};

export const getters = {
  answersAll(state) {
    return state.answers;
  }
};
