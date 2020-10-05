import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const profileQuery = gql`
  query {
    user(login: "jaylenej27") {
      avatarUrl
      name
      company
      repositories(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          name
          updatedAt
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(profileQuery);
  if (loading) return 'Loading... Please wait';
  if (error) return 'Opps! Something has gone wrong';

  return (
    <>
      <div className="App">
        <img
          src={data.user.avatarUrl}
          alt="User profile"
          style={{ height: 200, width: 150, borderRadius: 20 }}
        />
        <p>{data.user.name}</p>
      </div>
      <div>
        <ul>
          {data.user.repositories.nodes.map((repo) => {
            return <li key={repo.id}>{repo.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
