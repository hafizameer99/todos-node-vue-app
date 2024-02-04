<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create todos</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          placeholder="What do you want to do?"
          v-model="title"
          @keyup.enter="addTodo()"
        />
        <small class="form-text text-muted" v-show="typing">Hit enter to save</small>
      </div>
    </form>
  </div>
</template>
<script>
    import EventBus from '../Todos/event-bus.js'

    export default {
        data() {
            return {
            title: "",
            typing: false
            };
        },
        methods:{
            addTodo() {
                // if (event) event.preventDefault();
                let todo = {
                    title: this.title,
                    completed: false
                };
                this.$http.post("todo",todo)
                .then(response => {
                    console.log(response)
                    this.clearTodo();
                    this.refreshTodo();
                    this.typing = false;
                })
                .catch(error => {
                    console.log(error);
                })
            },
            clearTodo() {
                this.todo = ""
            },
            refreshTodo() {
              EventBus.$emit("refreshTodo");
            }
        }
    };
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>