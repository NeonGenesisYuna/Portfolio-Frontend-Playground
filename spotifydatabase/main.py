from flask import Flask, jsonify
from flask_cors import CORS
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import os

app = Flask(__name__)
CORS(app)

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=os.getenv("f4f4e7428a764f0a9152b6b27a3fc2d8"),
    client_secret=os.getenv("2f735e17f7c9485aa42994895e2de991"),
    redirect_uri=os.getenv("https://portfolio-frontend-playground.vercel.app/spotifydatabase/index.html"),
    scope="user-library-read user-top-read"
))

@app.route('/spotifydatabase/top-songs')
def get_top_songs():
    results = sp.current_user_top_tracks(time_range='short_term', limit=10)
    songs = [
        {
            "name": track["name"],
            "artist": track["artists"][0]["name"],
            "image": track["album"]["images"][0]["url"]
        }
        for track in results['items']
    ]
    return jsonify(songs)

@app.route('/spotifydatabase/top-artists')
def get_top_artists():
    results = sp.current_user_top_artists(time_range='short_term', limit=10)
    artists = [
        {
            "name": artist["name"],
            "image": artist["images"][0]["url"]
        }
        for artist in results['items']
    ]
    return jsonify(artists)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
     