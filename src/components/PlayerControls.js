import React from 'react';
import {
  TbPlayerPlay,
  TbPlayerPause,
  TbPlayerSkipForward,
  TbPlayerSkipBack,
} from 'react-icons/tb';
import { ButtonGroup, Button } from 'react-bootstrap';

const PlayerControls = ({
  // Player state
  isPlaying,

  // Player actions
  togglePlay,
  playNext,
  playPrevious,
}) => {

  return (
    <div className="minimal-controls">
      <ButtonGroup className="control-buttons" aria-label="Player controls">
        <Button
          size="lg"
          variant="link"
          onClick={playPrevious}
          title="Previous track"
          className="control-btn"
        >
          <TbPlayerSkipBack size={28} />
        </Button>

        <Button
          size="lg"
          variant="link"
          onClick={togglePlay}
          title={isPlaying ? "Pause" : "Play"}
          className="control-btn play-btn"
        >
          {isPlaying ? (
            <TbPlayerPause size={40} />
          ) : (
            <TbPlayerPlay size={40} />
          )}
        </Button>

        <Button
          size="lg"
          variant="link"
          onClick={playNext}
          title="Next track"
          className="control-btn"
        >
          <TbPlayerSkipForward size={28} />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PlayerControls;
