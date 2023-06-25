import React, { useState } from "react";
import {
  GetTodosQueryVariables,
  useGetTodosQuery,
  CreateTodoMutationVariables,
  useCreateTodoMutation,
  UpdateTodoMutationVariables,
  useUpdateTodoMutation,
  DeleteTodoMutationVariables,
  useDeleteTodoMutation,
} from "@/graphql/generated/graphql";

function TodoTable() {
  const [sortDirection, setSortDirection] = useState<GetTodosQueryVariables["sortDirection"]>("asc");
  const { loading, error, data, refetch } = useGetTodosQuery({
    variables: { sortDirection },
    fetchPolicy: "cache-and-network",
    pollInterval: 5000,
  });
  const [newTodo, setNewTodo] = useState<CreateTodoMutationVariables>({
    title: "",
    description: "",
    completed: false,
  });

  const [createTodoMutation] = useCreateTodoMutation();
  const [updateTodoMutation] = useUpdateTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();

  const handleSaveTodo = async () => {
    const { data, errors } = await createTodoMutation({
      variables: {
        title: newTodo.title,
        description: newTodo.description,
        completed: newTodo.completed,
      },
    });
    if (data) {
      alert("Todo created successfully!");
      setNewTodo({
        title: "",
        description: "",
        completed: false,
      });
      refetch();
      return;
    }
    alert(errors);
  };
  const handleUpdateTodo = async ({ id, title, description, completed }: UpdateTodoMutationVariables) => {
    const { data, errors } = await updateTodoMutation({
      variables: {
        id,
        title,
        description,
        completed,
      },
    });
    if (data) {
      alert("Todo updated successfully!");
      refetch();
      return;
    }
    alert(errors);
  };
  const handleDeleteTodo = async ({ id }: DeleteTodoMutationVariables) => {
    const { data, errors } = await deleteTodoMutation({
      variables: {
        id,
      },
    });
    if (data) {
      alert("Todo deleted successfully!");
      refetch();
      return;
    }
    alert(errors);
  };

  const handleSortDirectionChange = () => {
    const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newSortDirection);
    refetch({ sortDirection: newSortDirection });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  const { todos } = data;

  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>
            Title <button onClick={handleSortDirectionChange}>{sortDirection === "asc" ? "▲" : "▼"}</button>
          </th>
          <th>Description</th>
          <th>Completed</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(({ id, title, description, completed }) => (
          <tr key={id}>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => handleUpdateTodo({ id, title: e.target.value, description, completed })}
                className="todo-input"
              />
            </td>
            <td>
              <input
                type="text"
                value={description || ""}
                onChange={(e) => handleUpdateTodo({ id, title, description: e.target.value, completed })}
                className="todo-input"
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => handleUpdateTodo({ id, title, description, completed: e.target.checked })}
                className="todo-input"
              />
            </td>
            <td>
              <button onClick={() => handleDeleteTodo({ id })} className="delete-button">
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
            <input
              type="checkbox"
              checked={newTodo.completed}
              onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
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
