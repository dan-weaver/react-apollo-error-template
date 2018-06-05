import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "apollo-link";
import { schema, root } from "./schema";

export const link = new ApolloLink(operation => {
  return new Observable(observer => {
    const { query, operationName, variables } = operation;
    delay(operationName === "PersonUnderFetching" ? 6000 : 3000)
      .then(() => {
        console.log(operationName);
        return graphql(
          schema,
          print(query),
          root,
          {},
          variables,
          operationName
        );
      })
      .then(result => {
        console.log(result);
        observer.next(result);
        observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
