const LibrarySong = ({ songs, song, setCurrentSong, audioRef, isPlaying, setSongs }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);

    const newSongs = songs.map(s => {
      if (s.id === song.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return { ...s, active: false };
      }
    });

    setSongs(newSongs);

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(audio => audioRef.current.play());
      }
    }
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
