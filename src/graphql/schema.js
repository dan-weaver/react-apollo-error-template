import { buildSchema } from "graphql";

const pets = [{ type: "dog", name: "sparky", id: 1 }];

export const schema = buildSchema(
  `
    type Pets {
      id: ID
      name: String
      type:String
    }

    type Person {
      id: ID!
      name: String
      hobby: String
      pets: [Pets]
    }

    type Query {
      people: [Person]
    }
  `
);

const peopleData = [
  { id: 1, name: "John Smith", hobby: "golf", pets: [] },
  { id: 2, name: "Sara Smith", hobby: "swimming", pets: [] },
  { id: 3, name: "Bud Deey", hobby: "sailing", pets }
];

export const root = {
  people: () => peopleData
};
