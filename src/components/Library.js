import LibrarySong from './LibrarySong';

const Library = ({ songs }) => {
  return (
    <div className="library">
      <div className="library-songs">
        {songs?.map(song => (
          <LibrarySong song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
