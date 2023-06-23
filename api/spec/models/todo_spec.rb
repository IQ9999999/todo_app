require 'rails_helper'

RSpec.describe Todo, type: :model do
  subject { described_class.new(title: 'Test Todo', description: 'This is a test todo', completed: false) }

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a title' do
    subject.title = nil
    expect(subject).to_not be_valid
  end

  it 'is not valid without a completed status' do
    subject.completed = nil
    expect(subject).to_not be_valid
  end
end