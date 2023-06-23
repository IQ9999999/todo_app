module Mutations
  class CreateTodo < Mutations::BaseMutation
    argument :input, Mutations::TodoInput, required: true
    field :todo, Types::TodoType, null: false

    def resolve(input:)
      todo = Todo.create!(
        title: input.title,
        description: input.description,
        completed: input.completed
      )
      { todo: todo }
    end
  end
end