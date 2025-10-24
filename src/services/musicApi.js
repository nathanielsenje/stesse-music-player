/**
 * Music API Service
 * Handles fetching playlist data from backend, SoundCloud, or mock data
 *
 * Data Source Priority:
 * 1. SoundCloud API (if REACT_APP_USE_SOUNDCLOUD=true)
 * 2. Custom API (if REACT_APP_API_URL is set)
 * 3. Mock Data (fallback)
 */

import { getConcentrationHardRock, isSoundCloudConfigured } from './soundcloudApi';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';
const USE_SOUNDCLOUD = process.env.REACT_APP_USE_SOUNDCLOUD === 'true';
const USE_MOCK_DATA = !API_BASE_URL && !USE_SOUNDCLOUD;

/**
 * Fetch playlist from SoundCloud, API, or mock data
 * @returns {Promise<Array>} Array of track objects
 */
export const fetchPlaylist = async () => {
  try {
    // Try SoundCloud first if enabled
    if (USE_SOUNDCLOUD) {
      const isConfigured = await isSoundCloudConfigured();
      if (isConfigured) {
        console.log('Fetching concentration hard rock from SoundCloud...');
        const tracks = await getConcentrationHardRock();
        if (tracks && tracks.length > 0) {
          console.log(`Successfully loaded ${tracks.length} tracks from SoundCloud`);
          return tracks;
        }
      } else {
        console.warn('SoundCloud enabled but not configured. Falling back to mock data.');
        console.warn('To use SoundCloud: Add REACT_APP_SOUNDCLOUD_CLIENT_ID to .env');
      }
    }

    // Try custom API
    if (API_BASE_URL && !USE_MOCK_DATA) {
      const response = await fetch(`${API_BASE_URL}/api/playlist`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.tracks || [];
    }

    // Fallback to mock data
    console.log('Using mock data...');
    const response = await fetch('/mockData.json');
    if (!response.ok) {
      throw new Error('Failed to fetch mock playlist data');
    }
    const data = await response.json();
    return data.tracks || [];

  } catch (error) {
    console.error('Error fetching playlist:', error);

    // Ultimate fallback: return empty array instead of crashing
    console.warn('All data sources failed. Returning empty playlist.');
    return [];
  }
};

/**
 * Fetch single track by ID
 * @param {string|number} trackId - The track ID
 * @returns {Promise<Object>} Track object
 */
export const fetchTrackById = async (trackId) => {
  try {
    if (USE_MOCK_DATA) {
      const playlist = await fetchPlaylist();
      const track = playlist.find((t) => t.id === trackId);
      if (!track) {
        throw new Error(`Track with ID ${trackId} not found`);
      }
      return track;
    } else {
      const response = await fetch(`${API_BASE_URL}/api/tracks/${trackId}`);
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching track:', error);
    throw error;
  }
};

/**
 * Search tracks by query
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching tracks
 */
export const searchTracks = async (query) => {
  try {
    if (USE_MOCK_DATA) {
      const playlist = await fetchPlaylist();
      const lowercaseQuery = query.toLowerCase();
      return playlist.filter((track) => {
        return (
          track.title?.toLowerCase().includes(lowercaseQuery) ||
          track.artist?.toLowerCase().includes(lowercaseQuery) ||
          track.album?.toLowerCase().includes(lowercaseQuery)
        );
      });
    } else {
      const response = await fetch(
        `${API_BASE_URL}/api/tracks/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.tracks || [];
    }
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};

/**
 * Get current data source being used
 * @returns {Promise<string>} 'soundcloud', 'api', or 'mock'
 */
export const getCurrentDataSource = async () => {
  if (USE_SOUNDCLOUD) {
    const isConfigured = await isSoundCloudConfigured();
    if (isConfigured) return 'soundcloud';
  }
  if (API_BASE_URL) return 'api';
  return 'mock';
};

/**
 * Expected API Response Format:
 *
 * GET /api/playlist
 * {
 *   "tracks": [
 *     {
 *       "id": "1",
 *       "title": "Song Title",
 *       "artist": "Artist Name",
 *       "album": "Album Name",
 *       "duration": 192,  // in seconds
 *       "audioUrl": "https://example.com/audio.mp3",
 *       "coverUrl": "https://example.com/cover.jpg",
 *       "year": 2024,
 *       "genre": "Pop"
 *     }
 *   ]
 * }
 *
 * GET /api/tracks/:id
 * {
 *   "id": "1",
 *   "title": "Song Title",
 *   ...
 * }
 *
 * GET /api/tracks/search?q=query
 * {
 *   "tracks": [ ... ]
 * }
 */
