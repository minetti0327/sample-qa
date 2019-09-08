<template>
  <section class="section no-top-pad">
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{question.title}}</strong>
              <br />
              <small>{{question.user && question.user.name}}</small>
              <small>{{this.$moment(question.createdAt).format("YYYY.MM.DD - h:mm a")}}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
    <div>
      <article class="media">
        <figure class="media-left">
          <p class="image is-48x48"></p>
        </figure>
        <div class="media-content">
          <div class="content">
            <!-- ここに回答が入る -->
            <AnswerList
              v-for="(a,index) in allAnswers"
              :key="index"
              :answer="a"
              :questionId="question.id"
            />
          </div>
        </div>
      </article>
    </div>
    <br />
    <article class="media">
      <div v-if="isLogin" class="media-content">
        <div class="field">
          <p class="control">
            <textarea class="textarea" v-model="answer" placeholder="回答を入力してください！"></textarea>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button" @click="onAnsewer">質問に回答</button>
          </p>
        </div>
      </div>
      <div v-else>アカウントを作成して質問に回答しましょう！</div>
    </article>
  </section>
</template>
<script>
import apiJobMixin from "@/mixins/apiJobMixin";
// 作成したリスト用のコンポーネントを作成
import AnswerList from "@/components/AnswerList";
export default {
  data() {
    return {
      answer: "" // 入力されたinput用のデータ
    };
  },
  components: {
    AnswerList
  },
  computed: {
    question() {
      return this.$store.getters["question/question"];
    },
    allAnswers() {
      // computedでgetterで回答全件を取得
      return this.$store.getters["answer/answersAll"];
    }
  },
  methods: {
    onAnsewer() {
      this.$store.dispatch("answer/addAnswer", {
        answer: this.answer,
        userId: this.$store.getters.user.id,
        questionId: this.question.id
      });
    },
    jobsDone() {
      console.log("job done");
    }
  },
  mixins: [apiJobMixin],
  async fetch({ app, route, store }) {
    // fetchメソッドでSSR用のデータをfetchする
    let questionId = route.params.id;
    // 質問データのfetch
    await store.dispatch("question/fetchQuestion", questionId);
    // 回答データのfetch
    await store.dispatch("answer/fetchAnswersAll", questionId);
  }
};
</script>