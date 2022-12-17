

import React from 'react';
import { TbPlayerPlay, TbPlayerPause, TbArrowsShuffle, TbRepeat, TbPlayerSkipForward, TbPlayerSkipBack } from 'react-icons/tb';
import { ButtonGroup, Button } from 'react-bootstrap'

class PlayerControls extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isPlaying: true };
    this.handlePlay.bind(this);
  }

  handlePlay() {
    console.log("Button Clicked!");
    this.setState(currentState => ({
      isPlaying: !currentState.isPlaying
    }));
    console.log(this.state.isPlaying);
  }

  render() {

    let button;

    // const PlayPause = <Button size="lg" variant="light"><TbPlayerPlay id="repeat"/></Button>

    if (this.state.isPlaying) {
      button = <Button size="lg" variant="light" onClick={() => this.handlePlay()} ><TbPlayerPause id="pause"></TbPlayerPause></Button>
    } else {
      button = <Button size="lg" variant="light" onClick={() => this.handlePlay()} >
        <TbPlayerPlay id="play"></TbPlayerPlay>
      </Button>
    }
    return (
      <><ButtonGroup className="mt-3 d-flex aligns-items-center justify-content-center" aria-label="Basic example">
        <Button size="lg" variant="light">
          <TbArrowsShuffle
            id="shuffle"
          // onClick={}
          />
        </Button>
        <Button size="lg" variant="light">
          <TbPlayerSkipBack
            id="back"
          // onClick={}
          />
        </Button>
        {button}
        <Button size="lg" variant="light">
          <TbPlayerSkipForward
            id="next"
          // onClick={}
          />
        </Button>
        <Button size="lg" variant="light">
          <TbRepeat
            id="repeat"
          // onClick={}
          />
        </Button>
      </ButtonGroup>
      </>
    )
  }
}

export default PlayerControls;