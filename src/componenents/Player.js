//Player.js

import React from "react";
import Navigation from "./Navigation"
import PlayerDetails from "./PlayerDetails";
import Seeker from "./Seeker";


class Player extends React.Component {
  render() {
    return (
      <div className="player">
        <Navigation />
        <PlayerDetails />
        <Seeker />

      </div>
    );
  }
}
export default Player;