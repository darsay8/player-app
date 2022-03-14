import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <div className="library-songs">
        {songs?.map(song => (
          <LibrarySong
            audioRef={audioRef}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            songs={songs}
            song={song}
            key={song.id}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
