module Mutations
  class UpdateTodo < BaseMutation
    argument :id, ID, required: true
    argument :title, String, required: false
    argument :description, String, required: false
    argument :completed, Boolean, required: false
    field :todo, Types::TodoType, null: false

    def resolve(id: nil, title: nil, description: nil, completed: false)
      todo = Todo.find(id)
      todo.update!(
        title: title,
        description: description,
        completed: completed
      )
    end
  end
end