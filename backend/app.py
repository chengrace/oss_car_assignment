def print_wrapper(f):
    def wrapped(*args, **kwargs):
        result = f(*args, **kwargs)
        print(result)
        return result
    return wrapped

def add(a, b):
    return a + b
add = print_wrapper(add)

@print_wrapper
def add2(a, b):
    return a + b

from datetime import datetime
from functools import wraps
from hashlib import sha1

from bson import ObjectId
from flask import Flask, request, jsonify
import jwt
from pymongo import MongoClient

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

app.run()