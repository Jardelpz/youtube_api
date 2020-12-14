import requests

from flask import request
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


@app.route('/subs', methods=['POST'])
def get_subscribe_number():
    receive = request.json

    list_channel = []

    for i in receive:
        list_channel.append({
            "channelId": i.get('snippet').get('channelId'),
            "channelTitle": i.get('snippet').get('channelTitle')
        })

    for channel in list_channel:
        subscribe_number = {}
        url = f"https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id={channel.get('channelId')}&key=AIzaSyCFaTZgGLuy4XEEgyOe4y_J9imRK4miRr8"
        req = requests.get(url)
        if req.status_code == 200:
            channel.update({
                "subscribe_number": req.json()['items'][0]['statistics'].get('subscriberCount')
            })

        else:
            channel.update({
                "subscribe_number": None
            })

    return {"channels": list_channel}


# {'viewCount': '177990834', 'subscriberCount': '2120000', 'hiddenSubscriberCount': False, 'videoCount': '5253'}
if __name__ == '__main__':
    app.run()
