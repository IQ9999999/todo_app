module Mutations
  class TodoInput < Types::BaseInputObject
    argument :title, String, required: true
    argument :description, String, required: false
    argument :completed, Boolean, required: false, default_value: false
  end
end