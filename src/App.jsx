import { useEffect, useState, useId } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://kcdjxm1t26.execute-api.eu-west-1.amazonaws.com/todos")
      .then((res) => res.json())
      .then((res) => setTodos(res));
  }, []);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = { id: uuidv4(), todo: inputValue };
    setTodos([...todos, newTodo]);
    setInputValue("");
    fetch("https://kcdjxm1t26.execute-api.eu-west-1.amazonaws.com/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  }

  function handleDelete(id) {
    const newTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(newTodos);
    fetch(
      "https://kcdjxm1t26.execute-api.eu-west-1.amazonaws.com/todos/" + id,
      {
        method: "DELETE",
      }
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 shadow-lg p-6 bg-white rounded">
      <h1 className="text-4xl font-bold text-center mb-6">Todo List</h1>
      <form className="flex items-center mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="flex-1 p-2 border-2 border-gray-300 rounded-l-md shadow-sm"
          placeholder="Add a new todo"
          style={{ height: "42px" }}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 shadow"
          style={{ height: "42px" }}
        >
          Add Todo
        </button>
      </form>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-gray-50 p-2 my-2 rounded shadow"
          >
            <span className="flex-1">{todo.todo}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
