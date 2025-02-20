import { Routes, Route } from 'react-router-dom';
import Characters from './components/characters/list/Characters';
import CharacterDetail from './components/characters/detail/CharacterDetail';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
    </Routes>
  );
}

export default App;