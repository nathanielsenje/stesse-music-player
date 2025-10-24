// PlayerDetails.js - Minimal Design

import React from "react";
import { Container, Image, Spinner, Alert } from 'react-bootstrap';
import PlayerControls from "./PlayerControls";
import Seeker from "./Seeker";

function PlayerDetails({
  // Playlist props
  currentTrack,
  isShuffled,
  repeatMode,
  playlistLoading,
  playlistError,

  // Playlist actions
  playNext,
  playPrevious,
  toggleShuffle,
  toggleRepeat,

  // Audio player props
  isPlaying,
  currentTime,
  duration,
  volume,
  audioLoading,
  audioError,

  // Audio player actions
  togglePlay,
  seek,
  changeVolume,
  formatTime,
}) {

  // Get album image
  const getAlbumImage = () => {
    if (currentTrack?.coverUrl) {
      return currentTrack.coverUrl;
    }
    return "https://source.unsplash.com/featured/400x400";
  };

  return (
    <Container fluid className="minimal-player">
      {/* Error messages */}
      {playlistError && (
        <Alert variant="danger" className="error-alert">
          {playlistError}
        </Alert>
      )}
      {audioError && (
        <Alert variant="warning" className="error-alert">
          {audioError}
        </Alert>
      )}

      {/* Main content */}
      <div className="minimal-content">

        {/* Album Artwork - Centered */}
        <div className="album-container">
          {playlistLoading ? (
            <div className="loading-container">
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <div className={`album-artwork ${isPlaying ? 'playing' : 'paused'}`}>
              <Image
                src={getAlbumImage()}
                alt={currentTrack?.album || 'Album cover'}
                className="album-image"
              />
            </div>
          )}
        </div>

        {/* Artist Info - Bottom Left */}
        {currentTrack && (
          <div className="artist-info">
            <div className="artist-name">{currentTrack.artist || 'Unknown Artist'}</div>
            <div className="song-title">{currentTrack.title || 'Unknown Title'}</div>
          </div>
        )}

        {/* Seeker - Bottom Center */}
        <Seeker
          currentTime={currentTime}
          duration={duration}
          seek={seek}
          formatTime={formatTime}
        />

        {/* Player Controls - Bottom Center */}
        <PlayerControls
          isPlaying={isPlaying}
          isShuffled={isShuffled}
          repeatMode={repeatMode}
          volume={volume}
          togglePlay={togglePlay}
          playNext={playNext}
          playPrevious={playPrevious}
          toggleShuffle={toggleShuffle}
          toggleRepeat={toggleRepeat}
          changeVolume={changeVolume}
        />
      </div>
    </Container>
  );
}

export default PlayerDetails;
