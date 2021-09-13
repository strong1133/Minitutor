from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.mapEx

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/food', methods=['GET'])
def food():
    data = list(db.mapInfo.find({ }, {'_id': False}))
    return jsonify({'msg': 'success', 'data': data})




if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, use_reloader=False)
