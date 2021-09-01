from flask import Flask, render_template
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.perf_it


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


# doc = {'question': 'answer'}
# db.users.insert_one(doc)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True, use_reloader=False)