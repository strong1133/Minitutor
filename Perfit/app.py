from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.perf_it


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/choice', methods=['GET'])
def choice():
    return render_template('choice.html')


@app.route('/quiz', methods=['GET'])
def getQuiz():
    idx = request.args.get('idx')
    if idx is not None:
        data = findDB(idx)
        return jsonify({'result': 'success', 'quiz': data})
    return jsonify({'result': 'fail'})


def findDB(idx):
    data = list(db.qna.find({"idx": int(idx)}, {'_id': False}))
    return data


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, use_reloader=False)
