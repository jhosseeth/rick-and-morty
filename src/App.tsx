import { Routes, Route } from 'react-router-dom';
import CharactersLayout from './components/layout/CharactersLayout';
import CharacterDetail from './components/characters/detail/CharacterDetail';
import { useViewport } from './hooks/useViewport';

function App() {
  const { isDesktop } = useViewport();

  return (
    <Routes>
      <Route path="/" element={<CharactersLayout />}>
        {isDesktop && <Route path="/character/:id" element={<CharactersLayout />} />}
      </Route>
      {!isDesktop && <Route path="/character/:id" element={<CharacterDetail />} />}
    </Routes>
  );
}

export default App;