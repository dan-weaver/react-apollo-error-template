import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

// Watch out someone forgot to include the id field of pets.
// this should normally be required by the server side schema, and you'd get a warning there,
// but we're not always so lucky.
// In addition, the actual implementation of the id "getter" can be more complicated with a custom
// 'dataIdFromObject' implementation
const personWithPetsWithoutIds = gql`
  query PersonUnderFetching {
    people {
      id
      name
      pets {
        name
      }
    }
  }
`;

// this is the initial query that contains id's
const personOverview = gql`
  query PersonOverview {
    people {
      id
      name
      hobby
      pets {
        id
        name
      }
    }
  }
`;
class App extends Component {
  render() {
    const {
      data: { loading, people }
    } = this.props;
    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{" "}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and
            ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => (
              <li key={person.id}>
                {person.name} {person.hobby} {person.pets.length} {"pets"}
              </li>
            ))}
          </ul>
        )}
        <button>Change Budds name to buddy</button>
      </main>
    );
  }
}

export default compose(
  graphql(personWithPetsWithoutIds),
  graphql(personOverview)
)(App);
