ActiveAdmin.register Todo do
  permit_params :title, :description, :completed

  index do
    selectable_column
    id_column
    column :title
    column :description
    column :completed
    actions
  end

  filter :title
  filter :description
  filter :completed

  form do |f|
    f.inputs do
      f.input :title
      f.input :description
      f.input :completed
    end
    f.actions
  end

end