from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

CLIENT_SECRET_FILE = 'client_secret.json'
SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl']

flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
credentials = flow.run_console()
youtube = build('youtube', 'v3', credentials=credentials)


@app.route('/like', methods=['POST'])
def like():
    youtube.videos().rate(rating=request.json.get('action'), id=request.json.get('videoId')).execute()

    return {"message": "Ação executada!"}


@app.route('/comment', methods=['POST'])
def insert_comment():
    print(request.json)
    insert_result = youtube.commentThreads().insert(
        part="snippet",
        body=dict(
            snippet=dict(
                channelId=request.json.get('channelId'),
                videoId=request.json.get('videoId'),
                topLevelComment=dict(
                    snippet=dict(
                        textOriginal=request.json.get('comment'))
                )
            )
        )
    ).execute()

    comment = insert_result["snippet"]["topLevelComment"]
    author = comment["snippet"]["authorDisplayName"]
    text = comment["snippet"]["textDisplay"]
    return {
        "message": f"Inserted comment {text} for {author}"
    }


if __name__ == '__main__':
    app.run()
