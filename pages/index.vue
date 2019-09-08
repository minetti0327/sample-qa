<template>
  <div>
    <section class="section no-top-pad">
      <div class="columns is-centered is-mobile">
        <div v-if="isLogin" class="column is-half-desktop is-full-mobile is-full-tablet">
          <form @submit.prevent="onQuestion">
            <div class="field">
              <label class="label">あなたの質問は？</label>
              <div class="control">
                <textarea class="textarea" v-model="question" placeholder="質問を入力してください"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button
                  class="button is-primary"
                  :class="{ 'is-loading': busy }"
                  :disabled="busy"
                >質問する</button>
              </div>
            </div>
          </form>
        </div>
        <div v-else>アカウントを作成して質問をしましょう！</div>
      </div>
      <div class="is-centered is-mobile">
        <!-- ここに質問リストをいれる -->
        <QuestionList v-for="(q,index) in allQuestions" :key="index" :question="q" />
      </div>
    </section>
  </div>
</template>
<script>
import apiJobMixin from "@/mixins/apiJobMixin";
// 作成したリスト用のコンポーネントを作成
import QuestionList from "@/components/QuestionList";
export default {
  data() {
    return {
      question: "", // 入力されたinput用のデータ
      questions: [] // 質問の全件リストデータ
    };
  },
  mixins: [apiJobMixin],
  components: {
    QuestionList // コンポーネントの読み込み
  },
  methods: {
    onQuestion() {
      let userID = this.$store.getters.user.id;
      const payload = {
        question: this.question,
        userId: userID
      };
      this.$store.dispatch("question/addQuestion", payload);
    },
    jobsDone() {
      console.log("job done");
    }
  },
  computed: {
    allQuestions() {
      // computedでgetterで質問全件を取得
      return this.$store.getters["question/questionsAll"];
    }
  },
  async fetch({ app, store }) {
    // fetchメソッドでSSR用のデータをfetchする

    // すでにfetch済みなら再度Ajaxを叩かないようにする
    if (store.getters["question/questionsAll"].length > 0) {
      return;
    }

    // storeのfetchQuestionsAllアクションを叩く
    await store.dispatch("question/fetchQuestionsAll");
  }
};
</script>