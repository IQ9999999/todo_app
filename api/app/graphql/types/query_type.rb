module Types
  class QueryType < Types::BaseObject
    field :todo, Types::TodoType, null: false do
      argument :id, ID, required: true
    end

    field :todos, [Types::TodoType], null: false do
      argument :sort_direction, String, required: false, default_value: 'asc'
    end

    def todo(id:)
      Todo.find(id)
    end

    def todos(sort_direction:)
      Todo.order(title: sort_direction.to_sym)
    end
  end
end
