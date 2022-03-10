import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong }) => {
  return (
    <div className="library">
      <div className="library-songs">
        {songs?.map(song => (
          <LibrarySong setCurrentSong={setCurrentSong} songs={songs} song={song} key={song.id} />
        ))}
      </div>
    </div>
  );
};

export default Library;
