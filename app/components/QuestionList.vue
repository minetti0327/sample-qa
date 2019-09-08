<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <nuxt-link :to="`/question/${question.id}`">
          <p>
            <strong>{{question.title}}</strong>
          </p>
        </nuxt-link>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <p>
            <strong>@{{question.user.name}}</strong>
            <small>{{this.$moment(question.createdAt).format("YYYY.MM.DD - h:mm a")}}</small>
          </p>
        </div>
        <!-- ここに編集・削除ボタンが入る -->
        <div v-if="isQuestionUser" class="level-left buttons">
          <a class="button is-small is-rounded" @click="toggleEditModal">編集</a>
          <a class="button is-small is-rounded" @click="toggleRemoveModal">削除</a>
        </div>
      </nav>
    </div>
    <!-- 編集・削除モーダルが入る -->
    <div :class="`modal ${removeModalActive ? 'is-active' : ''}`">
      <div class="modal-background" @click="toggleRemoveModal"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <p>削除しますか？</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="toggleRemoveModal">閉じる</button>
          <button class="button is-danger" @click="()=>{removeQuestion(question.id)}">削除する</button>
        </footer>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleRemoveModal"></button>
    </div>
    <div :class="`modal ${editModalActive ? 'is-active' : ''}`">
      <div class="modal-background" @click="toggleEditModal"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <p>質問の編集</p>
          <textarea class="textarea" v-model="questionTitle" placeholder="質問を入力してください"></textarea>
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="toggleEditModal">閉じる</button>
          <button
            class="button is-primary"
            @click="()=>{updateQuestion(question.id,questionTitle)}"
          >編集する</button>
        </footer>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="toggleEditModal"></button>
    </div>
  </article>
</template>
<script>
export default {
  data() {
    return {
      removeModalActive: false, // 削除モーダルの表示・非表示フラグ
      editModalActive: false, // 編集モーダルの表示・非表示フラグ
      questionTitle: "" // 編集モーダルで入力する質問のデータ
    };
  },
  props: {
    question: {
      type: Object
    }
  },
  computed: {
    isQuestionUser() {
      // 質問したユーザーかどうかの判定処理
      // 質問したユーザーなら編集・削除ボタンを表示する
      if (!this.$store.getters.user) return false;
      return this.$store.getters.user.id === this.question.user.id
        ? true
        : false;
    }
  },
  methods: {
    toggleRemoveModal() {
      // モーダルの表示非表示処理
      this.removeModalActive = !this.removeModalActive;
    },
    toggleEditModal() {
      // モーダルの表示非表示処理
      this.questionTitle = this.question.title; // 編集のinputタグに質問のタイトルを事前に入れる
      this.editModalActive = !this.editModalActive;
    },
    removeQuestion(id) {
      // 削除処理、removeQuestionの引数にidを取り、actionにdispatchする
      this.$store.dispatch("question/removeQuestion", id);
      this.toggleRemoveModal(); // モーダルを閉じる
    },
    updateQuestion(id, updateText) {
      // 編集処理、updateQuestionの引数にidと編集した文字列を取り、actionにdispatchする
      this.$store.dispatch("question/updateQuestion", {
        id: id,
        updateText: updateText
      });
      this.toggleEditModal(); // モーダルを閉じる
    }
  }
};
</script>