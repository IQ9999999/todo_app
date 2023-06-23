module Mutations
  class UpdateTodo < BaseMutation
    argument :id, ID, required: true
    argument :input, Mutations::TodoInput, required: true
    field :todo, Types::TodoType, null: false

    def resolve(id:, input:)
      todo = Todo.find(id)
      todo.update!(
        title: input.title,
        description: input.description,
        completed: input.completed
      )

      { todo: todo }
    end
  end
end