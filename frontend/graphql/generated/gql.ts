/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateTodo($title: String!, $description: String!, $completed: Boolean!) {\n  createTodo(\n    input: {input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}": types.CreateTodoDocument,
    "mutation DeleteTodo($id: ID!) {\n  deleteTodo(input: {id: $id}) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}": types.DeleteTodoDocument,
    "mutation UpdateTodo($id: ID!, $title: String!, $description: String, $completed: Boolean) {\n  updateTodo(\n    input: {id: $id, input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}": types.UpdateTodoDocument,
    "query GetTodos($sortDirection: String) {\n  todos(sortDirection: $sortDirection) {\n    id\n    title\n    description\n    completed\n  }\n}": types.GetTodosDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTodo($title: String!, $description: String!, $completed: Boolean!) {\n  createTodo(\n    input: {input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"): (typeof documents)["mutation CreateTodo($title: String!, $description: String!, $completed: Boolean!) {\n  createTodo(\n    input: {input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTodo($id: ID!) {\n  deleteTodo(input: {id: $id}) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"): (typeof documents)["mutation DeleteTodo($id: ID!) {\n  deleteTodo(input: {id: $id}) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTodo($id: ID!, $title: String!, $description: String, $completed: Boolean) {\n  updateTodo(\n    input: {id: $id, input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"): (typeof documents)["mutation UpdateTodo($id: ID!, $title: String!, $description: String, $completed: Boolean) {\n  updateTodo(\n    input: {id: $id, input: {title: $title, description: $description, completed: $completed}}\n  ) {\n    todo {\n      id\n      title\n      description\n      completed\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTodos($sortDirection: String) {\n  todos(sortDirection: $sortDirection) {\n    id\n    title\n    description\n    completed\n  }\n}"): (typeof documents)["query GetTodos($sortDirection: String) {\n  todos(sortDirection: $sortDirection) {\n    id\n    title\n    description\n    completed\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;