import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Custom hook for managing playlist state
 * Handles current track, next/previous, shuffle, repeat, and search
 */
const usePlaylist = (fetchPlaylistFn) => {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'all', 'one'
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalPlaylist, setOriginalPlaylist] = useState([]);

  // Fetch playlist on mount
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPlaylistFn();
        setPlaylist(data);
        setOriginalPlaylist(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load playlist:', err);
        setError('Failed to load playlist. Please try again.');
        setIsLoading(false);
      }
    };

    if (fetchPlaylistFn) {
      loadPlaylist();
    }
  }, [fetchPlaylistFn]);

  // Filter playlist by search query
  const filteredPlaylist = useMemo(() => {
    if (!searchQuery.trim()) return playlist;

    const query = searchQuery.toLowerCase();
    return playlist.filter((track) => {
      return (
        track.title?.toLowerCase().includes(query) ||
        track.artist?.toLowerCase().includes(query) ||
        track.album?.toLowerCase().includes(query)
      );
    });
  }, [playlist, searchQuery]);

  // Get current track
  const currentTrack = useMemo(() => {
    if (filteredPlaylist.length === 0) return null;
    if (currentIndex < 0 || currentIndex >= filteredPlaylist.length) {
      return filteredPlaylist[0];
    }
    return filteredPlaylist[currentIndex];
  }, [filteredPlaylist, currentIndex]);

  // Shuffle array helper
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Toggle shuffle
  const toggleShuffle = useCallback(() => {
    setIsShuffled((prev) => {
      if (!prev) {
        // Turning shuffle ON
        const currentTrackData = currentTrack;
        const shuffled = shuffleArray(filteredPlaylist);

        // Make sure current track stays as first in shuffled order
        if (currentTrackData) {
          const currentIdx = shuffled.findIndex(
            (track) => track.id === currentTrackData.id
          );
          if (currentIdx > 0) {
            [shuffled[0], shuffled[currentIdx]] = [shuffled[currentIdx], shuffled[0]];
          }
        }

        // Note: shuffleOrder not currently used but could be for future features
        setCurrentIndex(0);
      } else {
        // Turning shuffle OFF
        const currentTrackData = currentTrack;
        if (currentTrackData) {
          const originalIdx = originalPlaylist.findIndex(
            (track) => track.id === currentTrackData.id
          );
          setCurrentIndex(originalIdx >= 0 ? originalIdx : 0);
        }
      }
      return !prev;
    });
  }, [currentTrack, filteredPlaylist, originalPlaylist, shuffleArray]);

  // Toggle repeat mode
  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  }, []);

  // Play next track
  const playNext = useCallback(() => {
    if (filteredPlaylist.length === 0) return;

    if (repeatMode === 'one') {
      // Stay on current track
      return;
    }

    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      if (nextIndex >= filteredPlaylist.length) {
        // End of playlist
        if (repeatMode === 'all') {
          return 0; // Loop back to start
        }
        return prevIndex; // Stay on last track
      }

      return nextIndex;
    });
  }, [filteredPlaylist.length, repeatMode]);

  // Play previous track
  const playPrevious = useCallback(() => {
    if (filteredPlaylist.length === 0) return;

    setCurrentIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      // At the beginning
      if (repeatMode === 'all') {
        return filteredPlaylist.length - 1; // Loop to end
      }
      return 0; // Stay at first track
    });
  }, [filteredPlaylist.length, repeatMode]);

  // Play specific track by index
  const playTrackAtIndex = useCallback((index) => {
    if (index >= 0 && index < filteredPlaylist.length) {
      setCurrentIndex(index);
    }
  }, [filteredPlaylist.length]);

  // Play specific track by ID
  const playTrackById = useCallback((id) => {
    const index = filteredPlaylist.findIndex((track) => track.id === id);
    if (index >= 0) {
      setCurrentIndex(index);
    }
  }, [filteredPlaylist]);

  // Update search query
  const updateSearchQuery = useCallback((query) => {
    setSearchQuery(query);
    setCurrentIndex(0); // Reset to first track when searching
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    // State
    playlist: filteredPlaylist,
    originalPlaylist,
    currentTrack,
    currentIndex,
    isShuffled,
    repeatMode,
    searchQuery,
    isLoading,
    error,

    // Actions
    playNext,
    playPrevious,
    playTrackAtIndex,
    playTrackById,
    toggleShuffle,
    toggleRepeat,
    updateSearchQuery,
    clearSearch,
    setPlaylist,
  };
};

export default usePlaylist;
