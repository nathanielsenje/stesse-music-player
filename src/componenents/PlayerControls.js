import React from 'react';
import { TbPlayerPlay, TbArrowsShuffle, TbRepeat, TbPlayerSkipForward, TbPlayerSkipBack } from 'react-icons/tb';
import { ButtonGroup, Button} from 'react-bootstrap'


function PlayerControls(props) {

  const handleClick = () => {
    console.log("You clicked play");
  }

  const handlePlay = () => {
    console.log("Music Playing");
  }

  const handlePause = () => {
    console.log("Music Paused");
  }

  const handleNext = () => {
    console.log("Playin Next Song");
  }

  const handlePrevious = () => {
    console.log("Playing Previous Song");
  }

  const handleShuffle = () => {
    console.log("Shuffle Toggle");
  }
  
  const handleRepeat = () => {
    console.log("Repeat Toggle");
  }
  return (
    <>
          <ButtonGroup className="mt-3 d-flex aligns-items-center justify-content-center" aria-label="Basic example">
          <Button variant="light">
          <TbArrowsShuffle
            id="shuffle"
            onClick={handleShuffle}
          />
          </Button>
          <Button variant="light">
          <TbPlayerSkipBack
            id="back"
            onClick={handlePrevious}
          />
          </Button>
          <Button variant="light">
          <TbPlayerPlay
            id="play"
            onClick={handlePlay} />
          </Button>
          <Button variant="light">
          <TbPlayerSkipForward
            id="next"
            onClick={handleNext}
          />
          </Button>
          <Button variant="light">
          <TbRepeat
            id="repeat"
            onClick={handleRepeat}
          />
          </Button>
      </ButtonGroup>
      


      
      {/* <button className="skip-btn" onClick={() => props.SkipSong(false)}>
        <FontAwesomeIcon icon="faShuffle" />
      </button>
      <button
        className="play-btn"
        onClick={() => props.setIsPlaying(!props.isPlaying)}
      >
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </button>
      <button className="skip-btn" onClick={() => props.SkipSong()}>
        <FontAwesomeIcon icon={faForward} />
      </button> */}
      
    </>
  );
}

export default PlayerControls; 