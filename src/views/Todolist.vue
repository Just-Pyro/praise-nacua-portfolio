<template>
  <router-link to="/projects"
      class="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none 
      ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
      Back
  </router-link>
  <div class="container">
    <div class="title">
      <h1>Todo App</h1>
    </div>
    <div class="actions">
      <form @submit.prevent="addTask">
        <div class="search-wrapper">
          <input class="search" type="text" placeholder="Search Task" v-model="searchQuery">
        </div>
        <div class="space"></div>
        <div class="add-wrapper">
          <input class="add" type="text" placeholder="Add Task" v-model="task" required>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
    <div class="tasks">
      <div class="task-items" v-for="todo in filteredTask" :key="todo.id">
        <p :class="{ done: todo.status }">{{ todo.details }}</p>
        <button class="done-btn" @click="markAsDone(todo.id)">Done</button>
        <button class="remove-btn" @click="removeTask(todo.id)">Remove</button>
      </div>
      <div class="footerbut">
        <button class="clear-btn" @click="clearTask" style="display: inline;">Clear All Tasks</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import db from '../firebase'
import { collection, query, onSnapshot,addDoc, orderBy, serverTimestamp, doc, deleteDoc, updateDoc, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      task: '',
      searchQuery: '',
      todos: [],
    };
  },
  methods: {
    async addTask(e){
      e.preventDefault();
      try{
          await addDoc(collection(db, "todos"), {
          todo: this.task,
          status: false,
          date_created: serverTimestamp()
        });
        this.task=''
      }catch(e){
        console.log(e);
      }
    },
    removeTask(id){
      const fsquery = doc(db, 'todos', id);
      deleteDoc(fsquery)
      .then(() => {
          console.log('Document successfully deleted.');
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
      

    },
    markAsDone(id){
      const fsquery = doc(db, 'todos', id);
      const newData = {
        status:true
      }
      updateDoc(fsquery, newData)
      .then(() => {
        console.log('Document successfully updated.');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
    },
    async clearTask() {
      const confirmed = window.confirm('Are you sure you want to clear all tasks?');

      if (confirmed) {
        const collectionName = "todos";
        this.deleteAllDocumentsInCollection(collectionName)
        .then(() => {
            console.log('Document successfully deleted.');
          })
          .catch((error) => {
            console.error('Error deleting document:', error);
          });
      }
    },
    async deleteAllDocumentsInCollection(collectionName) {
      const querySnapshot = await getDocs(collection(db, collectionName));

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    },
    getRealTimeData(){
      const q = query(collection(db, "todos"), orderBy('date_created','desc'));
      onSnapshot(q, (querySnapshot) => {
        const newTask = [];
        querySnapshot.forEach((doc) => {
              const todo = {
              id:doc.id,
              details:doc.data().todo,
              status:doc.data().status
            }
            newTask.push(todo);
        });
        this.todos=newTask;

      });
    },
  },
  mounted(){
    this.getRealTimeData();
  },
  computed: {
    filteredTask() {
      return this.todos.filter((todo) => {
        return todo.details.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  }
};
</script>

<style scoped>
  .container {
    max-width: 558px;
    margin: 0 auto;
    padding: 20px;
  }

  .title {
    text-align: center;
    font-size: 28px;
    margin-bottom: 20px;
  }

  .actions form {
    display: flex;
    flex-direction: column;
  }

  .search {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  .add {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
  }

  .space {
    margin-top: 10px;
  }

  .add-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .actions button[type="submit"] {
    background-color: limegreen;
    color: #fff;
    border: 0;
    border-radius: 0 5px 5px 0;
    padding: 10px 20px;
    cursor: pointer;
  }

  .tasks .task-items {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .tasks .task-items:hover {
    background-color: #f2f2f2;
  }

  .tasks p {
    flex: 1;
    margin: 0;
    padding: 10px;
    font-size: 18px;
  }

  .tasks .done-btn,
  .tasks .remove-btn {
    background-color: red;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  }

  .tasks .done-btn {
    background-color: blue;
    margin-right: 10px;
  }

  .clear-btn {
    background-color: #333;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-left: auto;
    margin-top: 20px;
  }

  .done {
    text-decoration: line-through;
  }
  .back-btn{
    background-color: #333;
    color: #fff;
    border: 0;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    float: right;
    margin-top: 20px;
    margin-right: 10px;
  }
</style>
