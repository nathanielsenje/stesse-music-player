# 🎸 SoundCloud Integration - Concentration Hard Rock

Your Stesse music player now supports fetching concentration hard rock music directly from SoundCloud!

## 🚀 Quick Start

### Option 1: Auto-Extract Client ID (Quick & Easy)

The app will automatically try to extract a SoundCloud client ID. Just enable it:

1. **The `.env` file is already configured** with `REACT_APP_USE_SOUNDCLOUD=true`
2. **Restart your dev server** (already done if you just set this up)
3. **Open the app** at http://localhost:3001
4. **Check the browser console** to see if SoundCloud loaded successfully

### Option 2: Use Your Own Client ID (Recommended for Production)

For better reliability and to avoid rate limits:

1. **Go to** https://developers.soundcloud.com
2. **Log in** with your SoundCloud account
3. **Click** "Register a new app"
4. **Fill in the form:**
   - App Name: `Stesse Music Player`
   - Description: `Concentration music player for focus and productivity`
   - Website: `http://localhost:3001` (or your production URL)
5. **Copy your Client ID**
6. **Add to `.env`:**
   ```
   REACT_APP_USE_SOUNDCLOUD=true
   REACT_APP_SOUNDCLOUD_CLIENT_ID=your_actual_client_id
   ```
7. **Restart the dev server**

---

## 🎵 What Music Will It Load?

The app searches SoundCloud for:
- **"concentration" + rock**
- **"focus" + rock**
- **"instrumental" + rock**
- **"hard rock"**

Results are combined, deduplicated, and sorted by popularity (playback count).

---

## 📊 How to Check If It's Working

### Browser Console Messages

Open your browser's Developer Tools (F12) and check the Console:

**✅ Success:**
```
Fetching concentration hard rock from SoundCloud...
Successfully loaded 47 tracks from SoundCloud
```

**⚠️ Fallback to Mock Data:**
```
SoundCloud enabled but not configured. Falling back to mock data.
To use SoundCloud: Add REACT_APP_SOUNDCLOUD_CLIENT_ID to .env
```

**❌ Error:**
```
SoundCloud API error: [error message]
All data sources failed. Returning empty playlist.
```

---

## 🔧 Troubleshooting

### Problem: "SoundCloud enabled but not configured"

**Solution:**
- The auto-extract method failed
- Get your own client ID from https://developers.soundcloud.com
- Add it to `.env` as shown above

### Problem: "401 Unauthorized" or API errors

**Solutions:**
1. **Verify your client ID** is correct in `.env`
2. **Check SoundCloud API status** at https://status.soundcloud.com
3. **Try the mock data temporarily:**
   ```
   # In .env
   REACT_APP_USE_SOUNDCLOUD=false
   # or
   REACT_APP_USE_MOCK=true
   ```

### Problem: CORS errors

**Solution:**
- SoundCloud's API has CORS restrictions
- The app uses the widget API which is CORS-friendly
- If issues persist, you may need a backend proxy

### Problem: Tracks won't play

**Possible causes:**
1. **SoundCloud track not streamable** - Some tracks require authentication
2. **Client ID expired** - Get a fresh one
3. **Network issues** - Check your internet connection

---

## 🎛️ Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_USE_SOUNDCLOUD` | Enable/disable SoundCloud | `false` |
| `REACT_APP_SOUNDCLOUD_CLIENT_ID` | Your SoundCloud client ID | (auto-extract) |
| `REACT_APP_API_URL` | Custom API endpoint | (none) |
| `REACT_APP_USE_MOCK` | Force mock data | `false` |

### Data Source Priority

The app checks sources in this order:

1. **SoundCloud** (if `REACT_APP_USE_SOUNDCLOUD=true`)
2. **Custom API** (if `REACT_APP_API_URL` is set)
3. **Mock Data** (fallback)

---

## 🎨 Customizing the Music Selection

Want different genres or search terms? Edit `src/services/soundcloudApi.js`:

```javascript
export const getConcentrationHardRock = async () => {
  const queries = [
    { query: 'concentration', genre: 'rock' },
    { query: 'focus', genre: 'metal' },        // Add metal
    { query: 'study', genre: 'rock' },         // Add study music
    { query: 'instrumental', genre: 'rock' },
  ];
  // ...
};
```

---

## 🔐 Security Notes

- ✅ `.env` is in `.gitignore` - your client ID won't be committed
- ✅ `.env.example` is provided for reference
- ⚠️ **Client-side API keys** are visible in browser network requests
- 🔒 For production, consider a **backend proxy** to hide credentials

---

## 📚 SoundCloud API Resources

- **Developer Portal:** https://developers.soundcloud.com
- **API Documentation:** https://developers.soundcloud.com/docs/api
- **Status Page:** https://status.soundcloud.com

---

## 🎉 Success!

If everything is working, you should see:
- ✅ Multiple hard rock tracks in your playlist
- ✅ Real artist names and album artwork from SoundCloud
- ✅ Playback counts and likes displayed
- ✅ Full playback functionality

Enjoy your concentration hard rock music! 🤘
