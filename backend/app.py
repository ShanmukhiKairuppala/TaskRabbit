from flask import Flask,request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users=[]
# tasks= []

@app.route('/')
def home():
    return "Welcome to Task Rabbit API",200

@app.route('/register',methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    if email in users:
        return jsonify({"message":"user already exists"}),400
    users[email] = data
    return jsonify({"message": "User registered successfully"}),201

@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email in users and users[email]['password'] == password :
        return jsonify({"message":"login successful"}),200
        
    return jsonify({"messgae":"invalid user credentials"}),400


# @app.route('/tasks',methods=['GET','POST'])
# def tasks():
#     data = request.get_json()
#     for user in users:
#         if user['email']==data['email'] and user['password'] == data['oassword']:
#             return jsonify({"message":"login successful"}),200
        
#     return jsonify({"messgae":"invalid user credentials"}),400



if __name__=='__main__':
    app.run(debug=True)
    