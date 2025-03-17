from flask import Flask, render_template_string
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth

app = Flask(__name__)
CORS(app)

# Spotify authentication
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id="f4f4e7428a764f0a9152b6b27a3fc2d8",
    client_secret="2f735e17f7c9485aa42994895e2de991",
    redirect_uri="http://localhost:8888/callback",
    scope="user-library-read user-top-read"
))

@app.route('/top-songs')
def get_top_songs():
    # Get the top 10 songs in the last 4 weeks
    results = sp.current_user_top_tracks(time_range='short_term', limit=10)
    songs_html = ""
    for track in results['items']:
        album_cover = track['album']['images'][0]['url']  # Get the album cover image
        songs_html += f'''
        <li class="song">
            <img src="{album_cover}" alt="Album Cover" class="album-cover"/>
            <div class="song-info">
                <span class="song-title">{track["name"]}</span>
                <span class="artist-name">by {track["artists"][0]["name"]}</span>
            </div>
        </li>
        '''

    # Return HTML with the link to the CSS file
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Top Data</title>
        <link rel="stylesheet" href="{{{{ url_for('static', filename='index.css') }}}}">
    </head>
    <body>
        <ul class="album-list">
            {songs_html}
        </ul>
    </body>
    </html>
    """
    return render_template_string(html_content)

# Add the missing route for top artists
@app.route('/top-artists')
def get_top_artists():
    # Get the top 10 artists in the last 4 weeks
    results = sp.current_user_top_artists(time_range='short_term', limit=10)
    artists_html = ""
    for artist in results['items']:
        artist_image = artist['images'][0]['url']  # Get the artist's profile image
        artists_html += f'''
        <li class="artist">
            <img src="{artist_image}" alt="Artist Image" class="artist-image"/>
            <div class="artist-info">
                <span class="artist-name">{artist["name"]}</span>
            </div>
        </li>
        '''

    # Return HTML with the link to the CSS file
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Top Data</title>
        <link rel="stylesheet" href="{{{{ url_for('static', filename='index.css') }}}}">
    </head>
    <body>
        <ul class="album-list">
            {artists_html}
        </ul>
    </body>
    </html>
    """
    return render_template_string(html_content)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
