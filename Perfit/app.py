## URL 별로 함수명이 같거나,
## route('/') 등의 주소가 같으면 안됩니다.

from pymongo import MongoClient

from flask import Flask, render_template
app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.perf_it

@app.route('api/list', methods=['GET'])
def home():
   return render_template('index.html')

doc = {'question':'answer'}
db.users.insert_one(doc)