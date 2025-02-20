import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { Link } from 'react-router-dom';

const GET_CHARACTERS = gql`
  query GetCharacters($name: String) {
    characters(page: 1, filter: { name: $name }) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

function Characters() {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { name: searchTerm }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search characters..."
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.characters.results.map((character: any) => (
          <Link to={`/character/${character.id}`} key={character.id}>
            <div className="bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition">
              <img src={character.image} alt={character.name} className="w-full rounded-md" />
              <h2 className="text-lg font-bold mt-2">{character.name}</h2>
              <p className="text-sm text-gray-400">{character.species}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Characters;