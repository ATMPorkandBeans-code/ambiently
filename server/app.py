import os
from dotenv import load_dotenv
load_dotenv()

import requests
from flask import Flask, jsonify, request, make_response, render_template
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, SavedSound

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)


api = Api(app)

class Sounds(Resource):

    def get(self):
        sounds = [sound.to_dict() for sound in SavedSound.query.all()]
        return make_response(jsonify(sounds), 200)
    
    def post(self):
        data = request.get_json()

        new_sound = SavedSound(
            freesound_id = data['freesound_id'],
            name = data['name']
        )

        db.session.add(new_sound)
        db.session.commit()

        return make_response(new_sound.to_dict(), 201)
    
class SoundById(Resource):
    def get(self, freesound_id):
        token = os.environ.get("FREESOUND_TOKEN")
        response = requests.get(
            f"https://freesound.org/apiv2/sounds/{freesound_id}",
            params={
                "fields": "id,name,duration,tags,username,previews,images,avg_rating",
                "token": token
            }
        )
        if response.status_code != 200:
            return {"error": "Freesound API error"}, response.status_code
        return response.json(), 200
    
class SoundSearch(Resource):
    def get(self):
        query = request.args.get("query", "").strip()
        page = request.args.get("page", 1)
        token = os.environ.get("FREESOUND_TOKEN")
        
        params = {
            "page": page,
            "page_size": 20,
            "fields": "id,name,duration,previews,images,avg_rating",
            "token": token
        }

        if query:
            params["query"] = query 
        else:
            params["query"] = ""

        response = requests.get(
            "https://freesound.org/apiv2/search/text/",
            params=params
        )

        if response.status_code != 200:
            return {"error": "Freesound API error"}, response.status_code
        
        return response.json(), 200




    
api.add_resource(Sounds, '/sounds')
api.add_resource(SoundById, '/sounds/<int:freesound_id>')
api.add_resource(SoundSearch, '/sounds/search')


if __name__ == '__main__':
    app.run(debug=True)