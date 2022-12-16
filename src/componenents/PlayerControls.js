import React from 'react';
import { TbPlayerPlay, TbArrowsShuffle, TbRepeat, TbPlayerSkipForward, TbPlayerSkipBack } from 'react-icons/tb';
import { Col, Row } from 'react-bootstrap'


function PlayerControls(props) {
  return (
    <Row div className="music-player-controls">
      <Col><TbArrowsShuffle className="player-button"/></Col>
      <Col><TbPlayerSkipBack className="player-button"/></Col>
      <Col><TbPlayerPlay className="player-button"/></Col>
      <Col><TbPlayerSkipForward className="player-button"/></Col>
      <Col><TbRepeat className="player-button"/></Col>
      


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
    </Row>
  );
}

export default PlayerControls; 