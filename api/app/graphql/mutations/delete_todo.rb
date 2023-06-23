module Mutations
  class DeleteTodo < BaseMutation
    argument :id, ID, required: true
    field :todo, Types::TodoType, null: false

    def resolve(id: nil)
      todo = Todo.find(id)
      todo.destroy!
    end
  end
end