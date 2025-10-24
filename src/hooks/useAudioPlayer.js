import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for managing audio playback
 * Handles play/pause, seeking, volume, and playback state
 */
const useAudioPlayer = (initialVolume = 0.7) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(initialVolume);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = initialVolume;

    // Event listeners
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    const handleError = (e) => {
      setIsLoading(false);
      setError('Failed to load audio. Please check the file URL.');
      setIsPlaying(false);
      console.error('Audio error:', e);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    // Cleanup
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audio.src = '';
    };
  }, [initialVolume]);

  // Load and play new track
  const loadTrack = useCallback((url) => {
    if (!audioRef.current || !url) return;

    const audio = audioRef.current;
    const wasPlaying = !audio.paused;

    audio.pause();
    audio.src = url;
    setCurrentTime(0);
    setError(null);

    // Auto-play if previous track was playing
    if (wasPlaying) {
      audio.play().catch((err) => {
        console.error('Autoplay failed:', err);
        setIsPlaying(false);
      });
    }
  }, []);

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    if (audio.paused) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Play failed:', err);
          setError('Playback failed. Please try again.');
          setIsPlaying(false);
        });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  // Play
  const play = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.error('Play failed:', err);
        setError('Playback failed. Please try again.');
        setIsPlaying(false);
      });
  }, []);

  // Pause
  const pause = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // Seek to specific time
  const seek = useCallback((time) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  // Change volume (0 to 1)
  const changeVolume = useCallback((newVolume) => {
    if (!audioRef.current) return;

    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = clampedVolume;
    setVolume(clampedVolume);
  }, []);

  // Mute/Unmute
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
  }, []);

  // Change playback rate
  const changePlaybackRate = useCallback((rate) => {
    if (!audioRef.current) return;

    audioRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  }, []);

  // Format time helper
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    // State
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    error,
    playbackRate,

    // Actions
    loadTrack,
    togglePlay,
    play,
    pause,
    seek,
    changeVolume,
    toggleMute,
    changePlaybackRate,

    // Utilities
    formatTime,
    audioRef,
  };
};

export default useAudioPlayer;
