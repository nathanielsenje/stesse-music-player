//Player.js

import React, { useEffect } from "react";
import Navigation from "./Navigation";
import PlayerDetails from "./PlayerDetails";
import { Container } from 'react-bootstrap';
import useAudioPlayer from '../hooks/useAudioPlayer';
import usePlaylist from '../hooks/usePlaylist';
import { usePlayerPersistence } from '../hooks/useLocalStorage';
import { fetchPlaylist } from '../services/musicApi';

const Player = () => {
  // Initialize hooks
  const audioPlayer = useAudioPlayer(0.7);
  const playlist = usePlaylist(fetchPlaylist);
  const { savedState, savePlayerState } = usePlayerPersistence();

  // Load saved state on mount
  useEffect(() => {
    if (savedState.volume !== undefined) {
      audioPlayer.changeVolume(savedState.volume);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Load track when current track changes
  useEffect(() => {
    if (playlist.currentTrack?.audioUrl) {
      audioPlayer.loadTrack(playlist.currentTrack.audioUrl);

      // If this is the saved track and we have a saved time, seek to it
      if (
        savedState.currentTrackId === playlist.currentTrack.id &&
        savedState.currentTime > 0
      ) {
        // Wait for metadata to load before seeking
        const handleLoadedMetadata = () => {
          audioPlayer.seek(savedState.currentTime);
        };

        if (audioPlayer.audioRef.current) {
          audioPlayer.audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist.currentTrack]);

  // Auto-play next track when current track ends
  useEffect(() => {
    if (!audioPlayer.audioRef.current) return;

    const handleEnded = () => {
      playlist.playNext();
    };

    audioPlayer.audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioPlayer.audioRef.current) {
        audioPlayer.audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist.playNext]);

  // Save state periodically and on unmount
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (playlist.currentTrack) {
        savePlayerState({
          currentTrackId: playlist.currentTrack.id,
          currentTime: audioPlayer.currentTime,
          volume: audioPlayer.volume,
          isShuffled: playlist.isShuffled,
          repeatMode: playlist.repeatMode,
        });
      }
    }, 5000); // Save every 5 seconds

    return () => {
      clearInterval(saveInterval);
      // Final save on unmount
      if (playlist.currentTrack) {
        savePlayerState({
          currentTrackId: playlist.currentTrack.id,
          currentTime: audioPlayer.currentTime,
          volume: audioPlayer.volume,
          isShuffled: playlist.isShuffled,
          repeatMode: playlist.repeatMode,
        });
      }
    };
  }, [
    audioPlayer.currentTime,
    audioPlayer.volume,
    playlist.currentTrack,
    playlist.isShuffled,
    playlist.repeatMode,
    savePlayerState,
  ]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Container className="pt-4">
        <Navigation />
        <PlayerDetails
          // Playlist props
          playlist={playlist.playlist}
          currentTrack={playlist.currentTrack}
          currentIndex={playlist.currentIndex}
          isShuffled={playlist.isShuffled}
          repeatMode={playlist.repeatMode}
          searchQuery={playlist.searchQuery}
          playlistLoading={playlist.isLoading}
          playlistError={playlist.error}

          // Playlist actions
          playNext={playlist.playNext}
          playPrevious={playlist.playPrevious}
          playTrackAtIndex={playlist.playTrackAtIndex}
          toggleShuffle={playlist.toggleShuffle}
          toggleRepeat={playlist.toggleRepeat}
          updateSearchQuery={playlist.updateSearchQuery}

          // Audio player props
          isPlaying={audioPlayer.isPlaying}
          currentTime={audioPlayer.currentTime}
          duration={audioPlayer.duration}
          volume={audioPlayer.volume}
          audioLoading={audioPlayer.isLoading}
          audioError={audioPlayer.error}

          // Audio player actions
          togglePlay={audioPlayer.togglePlay}
          seek={audioPlayer.seek}
          changeVolume={audioPlayer.changeVolume}
          formatTime={audioPlayer.formatTime}
        />
      </Container>
    </div>
  );
};

export default Player;
