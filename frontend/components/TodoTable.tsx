import React, { useState } from "react";
import { useQuery, useMutation, DocumentNode } from "@apollo/client";
import { graphql } from "../graphql/generated/gql";

const todosQueryDocument: DocumentNode = graphql(
  "query GetTodos($sortDirection: String) {\n  todos(sortDirection: $sortDirection) {\n    id\n    title\n    description\n    completed\n  }\n}"
);
const createTodoGraph: DocumentNode = graphql(
  "mutation CreateTodo($title: String!, $description: String!, $completed: Boolean!) {\n  createTodo(\n    input: {input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"
);
const updateTodoGraph: DocumentNode = graphql(
  "mutation UpdateTodo($id: ID!, $title: String!, $description: String, $completed: Boolean) {\n  updateTodo(\n    input: {id: $id, input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"
);
const deleteTodoGraph: DocumentNode = graphql(
  "mutation DeleteTodo($id: ID!) {\n  deleteTodo(input: {id: $id}) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"
);

function TodoTable() {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [sortDirection, setSortDirection] = useState("asc");
  const { loading, error, data, refetch } = useQuery(todosQueryDocument, { variables: { sortDirection } });

  const [createTodo] = useMutation(createTodoGraph, {
    onCompleted: () => {
      refetch();
    },
  });
  const [updateTodo] = useMutation(updateTodoGraph, {
    onCompleted: () => {
      refetch();
    },
  });
  const [deleteTodo] = useMutation(deleteTodoGraph, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleSaveTodo = async () => {
    try {
      await createTodo({
        variables: {
          title: newTodo.title,
          description: newTodo.description,
          completed: false,
        },
      });
      setNewTodo({ title: "", description: "" });
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  const handleUpdateTodo = async (id: string, title: string, description: string, completed: boolean) => {
    try {
      await updateTodo({
        variables: {
          id,
          title,
          description,
          completed,
        },
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo({
        variables: {
          id,
        },
      });
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSortDirectionChange = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    refetch({ sortDirection: newSortDirection });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>
            Title <button onClick={handleSortDirectionChange}>{sortDirection === "asc" ? "▲" : "▼"}</button>
          </th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.todos.map((todo: { id: string; title: string; description: string; completed: boolean }) => (
          <tr key={todo.id}>
            <td>
              <input
                type="text"
                value={todo.title}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.value, todo.description, todo.completed)}
                className="todo-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={todo.description}
                onChange={(e) => handleUpdateTodo(todo.id, todo.title, e.target.value, todo.completed)}
                className="todo-input"
              />
            </td>
            <td>
              <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <input
              type="text"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="todo-input"
            />
          </td>
          <td>
            <input
              type="text"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="todo-input"
            />
          </td>
          <td>
            <button onClick={handleSaveTodo} className="save-button">
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TodoTable;
