import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { getNewSongs } from '../helpers/util';

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
  setSongs,
  songInfo,
  setSongInfo,
}) => {
  const activeLibraryHandler = current => {
    const newSongs = getNewSongs(songs, current);
    setSongs(newSongs);
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = e => {
    const value = e.target.value;
    audioRef.current.currentTime = value;
    setSongInfo({ ...songInfo, currentTime: value });
  };

  const timeUpdateHandler = e => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage: animation });
  };

  const getTime = time => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  };

  const skipTrackHandler = async direction => {
    let currentIndex = songs.findIndex(s => s.id === currentSong.id);
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(s => s.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const backgroundTrack = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={backgroundTrack} className="track">
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className="player-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('skip-back')}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
