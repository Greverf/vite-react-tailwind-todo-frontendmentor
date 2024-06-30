import { useState } from "react";
import Header from "./components/Header";
import TodoComputer from "./components/TodoComputer";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
const initialStateTodos = [
  { id: 1, title: "Jog around the park 3x", completed: true },
  { id: 2, title: "10 minutes meditation", completed: true },
  { id: 3, title: "Read for 1 hour", completed: false },
  { id: 4, title: "Pick up groceries", completed: false },
  { id: 5, title: "Complete Todo App on Fronted Mentor", completed: false },
];
const App = () => {
  const [todos, setTodos] = useState(initialStateTodos);
  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      comleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const computedItemLeft = todos.filter((todo) => !todo.completed).length;
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const [filter, setFilter] = useState("all");
  const changeFilter = (filter) => setFilter(filter);
  const filterTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todos) => !todos.completed);
      case "completed":
        return todos.filter((todos) => todos.completed);

      default:
        break;
    }
  };
  return (
    <div className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-1000 dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')]">
      -
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <TodoCreate createTodo={createTodo} />

        <TodoList
          todos={filterTodos()}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />

        <TodoComputer
          computedItemLeft={computedItemLeft}
          clearCompleted={clearCompleted}
        />

        <TodoFilter changeFilter={changeFilter} filter={filter} />
      </main>
      <footer className=" mt-8 text-center dark:text-gray-400">
        Drag and drop to reorder list
      </footer>
    </div>
  );
};
export default App;
