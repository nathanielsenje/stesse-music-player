//Player.js

import React from "react";
import Navigation from "./Navigation"
import PlayerDetails from "./PlayerDetails";
import { Container } from 'react-bootstrap';


class Player extends React.Component {
  render() {
    return (
      <div className="d-flex aligns-items-center justify-content-center">
      <Container className="pt-4">
          <Navigation />
          <PlayerDetails />
        </Container>
        </div>
    );
  }
}
export default Player;