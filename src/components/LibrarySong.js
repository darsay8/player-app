import { getNewSongs, playAudio } from '../helpers/util';

const LibrarySong = ({ songs, song, setCurrentSong, audioRef, isPlaying, setSongs }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    const newSongs = getNewSongs(songs, song);
    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      className={`library-song ${song.active ? 'selected' : ''} `}
      onClick={() => songSelectHandler(song.id)}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
