<template>
    <div v-if="todos.length>0" class="col align-self-center">
      <div class="form-row align-items-center" v-for="todo in todos" :key="todo.id">
        <div class="col-auto my-1">
          <div class="input-group mb-3 todo__row">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <input
                  type="checkbox"
                  v-model="todo.completed"
                  :checked="todo.completed"
                  :value="todo.completed"
                  v-on:change="updateTodo(todo)"
                  title="Mark as done?"
                />
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              :class="todo.completed == true?'todo__done':''"
              v-model="todo.title"
              @keypress="todo.editing=true"
              @keyup.enter="updateTodo(todo)"
            />
            <div class="input-group-append">
              <div class="input-group-text">
                <span
                  class="input-group-addon addon-left"
                  title="Delete todo?"
                  v-on:click="deleteTodo(todo._id)">
                  X
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="alert alert-primary todo__row"
        v-show="todos.length==0 && doneLoading"
      >Hardest worker in the room. No more todos now you can rest. ;)</div>
    </div>
  </template>
  <script>
    import EventBus from "./event-bus.js";

    export default {
        data() {
            return {
                todos:[],
                doneLoading: false
            };
        },
        created: function() {
            this.fetchTodos();
        },
        mounted () {
          this.listenToEvents();
          EventBus.$on("refreshTodo", () => {
              // this.methodInChild();
              this.fetchTodos();
          });
        },
        watch: {
            $route: function () {
                let self = this;
                self.doneLoading = false;
                self.fetchTodos().then(() => {
                    self.doneLoading = true
                });
            }
        },
        methods:{
          fetchTodos() {
                this.$http.get('todo')
                .then(res => {
                    // const { data } = res.allTodos;
                    this.todos = res.data.allTodos;
                    console.log(this.todos)
                })
                .catch(error => {
                    console.log(error)
                })
            },
            updateTodo(todo) {
                let id = todo._id;
                this.$http
                .put(`todo/${id}`, todo)
                .then(response => {
                console.log(response);
                })
                .catch(error => {
                console.log(error);
                });
            },
            deleteTodo(id) {
                this.$http
                .delete(`todo/${id}`)
                .then(response => {
                console.log(response);
                })
                .catch(error => {
                console.log(error);
                });
            },
            // listenToEvents() {
            //   EventBus.$on("refreshTodo", () => {
            //         this.fetchTodo(); //update todo
            //     });
            // }
        },
    }
  </script>
  <style lang="scss" scoped>
  .todo__done {
    text-decoration: line-through !important;
  }
  
  .no_border_left_right {
    border-left: 0px;
    border-right: 0px;
  }
  
  .flat_form {
    border-radius: 0px;
  }
  
  .mrb-10 {
    margin-bottom: 10px;
  }
  
  .addon-left {
    background-color: none !important;
    border-left: 0px !important;
    cursor: pointer !important;
  }
  
  .addon-right {
    background-color: none !important;
    border-right: 0px !important;
  }
  </style>