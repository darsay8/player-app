import { getNewSongs } from '../helpers/util';

const LibrarySong = ({ songs, song, setCurrentSong, audioRef, isPlaying, setSongs }) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const newSongs = getNewSongs(songs, song);
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
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
