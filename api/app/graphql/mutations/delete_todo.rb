module Mutations
  class DeleteTodo < BaseMutation
    argument :id, ID, required: true
    field :todo, Types::TodoType, null: false

    def resolve(id:)
      todo = Todo.find(id)
      todo.destroy!

      { todo: todo }
    end
  end
end