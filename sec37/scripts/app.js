const { createApp } = Vue;

const todoApp = createApp({
  data() {
    return {
      allTodos: [],
      enteredTodoText: "",
      editedTodoId: null,
    };
  },
  methods: {
    async saveTodo(event) {
      event.preventDefault();

      if (this.editedTodoId) {
        // Updating...
        const todoId = this.editedTodoId;

        let response;

        try {
          response = await fetch("http://localhost:7778/todo/" + todoId, {
            method: "PATCH",
            body: JSON.stringify({
              newText: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("Something went wrong!");
          return;
        }

        if (!response.ok) {
          alert("Something went wrong!");
          return;
        }

        const todoIndex = this.allTodos.findIndex(function (todoItem) {
          return todoItem.id === todoId;
        });

        const updatedTodoItem = {
          id: this.allTodos[todoIndex].id,
          text: this.enteredTodoText,
        };

        this.allTodos[todoIndex] = updatedTodoItem;
        this.editedTodoId = null;
      } else {
        let response;
        try {
          response = await fetch("http://localhost:7778/todo", {
            method: "POST",
            body: JSON.stringify({
              text: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("Something went wrong!");
          return;
        }

        if (!response.ok) {
          alert("Something went wrong!");
          return;
        }

        const responseData = await response.json();
        console.log(responseData);
        const todoId = responseData.createdTodo.id;
        const newTodo = {
          text: this.enteredTodoText,
          id: todoId,
        };
        this.allTodos.push(newTodo);
      }

      this.enteredTodoText = "";
    },
    startEdit(todoId) {
      this.editedTodoId = todoId;
      const todo = this.allTodos.find(function (todoItem) {
        return todoItem.id === todoId;
      });
      this.enteredTodoText = todo.text;
    },
    async deleteTodo(todoId) {
      this.allTodos = this.allTodos.filter(function (item) {
        return item.id !== todoId;
      });

      let response;

      try {
        response = await fetch("http://localhost:7778/todo/" + todoId, {
          method: "DELETE",
        });
      } catch (error) {
        alert("Something went wrong!");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }
    },
  },
  async created() {
    let response;
    try {
      response = await fetch("http://localhost:7778/todo");
    } catch (error) {
      alert("Something went wrong!");
      return;
    }

    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }

    const responseData = await response.json();
    const todos = responseData.todos;
    this.allTodos = todos;
  },
});

todoApp.mount("#app");
