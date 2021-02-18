from datetime import datetime
from functools import wraps
from hashlib import sha1

from bson import ObjectId
from bson.json_util import dumps
from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from pymongo import MongoClient
import json

secret = "the sky is blue"
client = MongoClient()
db = client.cars

# upsert user
db.users.update_one({
    '_id': ObjectId('5ffcd26135312bec513e5ade')
}, {'$set': {
    '_id': ObjectId('5ffcd26135312bec513e5ade'),
    'name': 'roofus',
    'pass': sha1('doofus'.encode('utf-8')).hexdigest()
    }
}, upsert=True)

app = Flask(__name__)
cors = CORS(app)

@app.route('/hello')
def hello():
    return 'hello\n'

@app.route('/hello/<name>')
def hello_url(name):
    last = request.args.get('last', '')
    return f'hello {name} {last}\n'

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    name = data['name']
    _pass = data['pass'].encode('utf-8')
    hashpass = sha1(_pass).hexdigest()
    print(name, hashpass)
    user = db.users.find_one({
        'name': name,
        'pass': hashpass
    })
    print(user)
    if not user:
        return jsonify({'error': 'bad username or password'}), 404

    token = jwt.encode({
        'sub': name,
        'exp': datetime.now().timestamp() + 60 * 60
    }, secret)
    return jsonify({'token': token})

def login_required(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        token = request.headers.get('API-Token', None)
        if token is None:
            return jsonify({'error': 'API-Token header required'}), 401
        try:
            decoded = jwt.decode(token, secret, algorithms=['HS256'])
        except jwt.exceptions.InvalidSignatureError:
            return jsonify({'error': 'bad token signature'}), 403
        if decoded['exp'] <= datetime.now().timestamp():
            return jsonify({'error': 'expired token'}), 403
        kwargs['token'] = decoded
        return f(*args, **kwargs)
    return wrapped

@app.route('/logged-in-hello')
@login_required
def logged_in_hello(token=None):
    return f'hello {token["sub"]}\n'

@app.route('/listings', methods=['GET'])
def listings():
    '''
    if request.method == 'POST':
        listing = request.json
        db.listings.insert_one(listing)
    '''
    #list (python dict form) of documents in listing collection
    car_listings = list(db.listings.find())
    #print(car_listings)
    json_data = dumps(car_listings)
    #print(json_data)
    return json_data

@app.route('/listings', methods=['POST'])
#@login_required
def add_listing():
    listing = request.json
    db.listings.insert_one(listing)
    listings = list(db.listings.find())
    json_listings = dumps(listings)
    return json_listings

@app.route('/listings/<_id>', methods=['DELETE'])
#@login_required
def delete_car(_id):
    print(_id)
    db.listings.delete_one({"_id": _id})
    listings = list(db.listings.find())
    #print(listings)
    json_listings = dumps(listings)
    return json_listings

'''
@app.route('/listings/<_id>', methods=['GET'])
def car_data(_id):
        find_car = db.listings.find({'_id': ObjectId(_id)})
        return jsonify(find_car)

@app.route('/listings/stats', methods=['GET'])
def stats():
    group_by_make = db.listings.aggregate([
        {"$group":{
            "make": "$make",
            "count": {$sum": 1}}
        }}
    ])
    return group_by_make

'''
if __name__ == '__main__':
    app.run(debug = True)