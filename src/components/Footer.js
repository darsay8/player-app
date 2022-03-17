import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeDown,
  faRepeat,
  faShuffle,
  faVolumeOff,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const Footer = ({ songInfo, setSongInfo, audioRef }) => {
  const [activeVolume, setActiveVolume] = useState(false);

  const handleChangeVolume = e => {
    const value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    <footer>
      <div className="play-mode">
        {' '}
        <FontAwesomeIcon icon={faRepeat} />
        <FontAwesomeIcon icon={faShuffle} />
      </div>
      <div className="volume-control">
        <FontAwesomeIcon
          className="volume-icon"
          onClick={() => setActiveVolume(!activeVolume)}
          icon={
            songInfo.volume > 0
              ? songInfo.volume > 0.5
                ? faVolumeHigh
                : faVolumeDown
              : faVolumeOff
          }
        />

        <input
          onChange={handleChangeVolume}
          value={songInfo.volume}
          max="1"
          min="0"
          step="0.01"
          type="range"
        />
      </div>
    </footer>
  );
};

export default Footer;
