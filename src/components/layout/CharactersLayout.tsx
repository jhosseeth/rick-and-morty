import { useParams } from 'react-router-dom';
import { useViewport } from '../../hooks/useViewport';
import Characters from '../characters/list/Characters';
import CharacterDetail from '../characters/detail/CharacterDetail';

function CharactersLayout() {
  const { isDesktop } = useViewport();
  const { id } = useParams();

  if (!isDesktop) {
    return <Characters />;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-1">
        <Characters />
      </div>
      <div className="col-span-1 sticky top-6">
        {id ? (
          <CharacterDetail />
        ) : (
          <div className="h-full flex items-center justify-center bg-white rounded-lg p-6">
            <p className="text-primary-600 text-lg">Select a character to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharactersLayout;