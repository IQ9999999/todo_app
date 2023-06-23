module Mutations
  class CreateTodo < BaseMutation
    argument :title, String, required: true
    argument :description, String, required: false
    argument :completed, Boolean, required: false
    field :todo, Types::TodoType, null: false

    def resolve(title: nil, description: nil, completed: false)
      todo = Todo.create!(
        title: title,
        description: description,
        completed: completed
      )
    end
  end
end