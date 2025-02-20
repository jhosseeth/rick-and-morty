import { useQuery, gql } from "@apollo/client";
import './App.css'

const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {data.characters.results.map((character: any) => (
        <div key={character.id} className="bg-gray-800 text-white p-4 rounded-lg">
          <img src={character.image} alt={character.name} className="w-full rounded-md" />
          <h2 className="text-lg font-bold mt-2">{character.name}</h2>
          <p className="text-sm text-gray-400">{character.species}</p>
        </div>
      ))}
    </div>
  );
}

export default App;