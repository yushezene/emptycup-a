from flask import Flask, jsonify, send_from_directory
import os
# live server worked 
app = Flask(__name__)

# frontend 
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/listings')
def listings():
    with open('listings.json', 'r') as file:
        data = file.read()
    return app.response_class(data, mimetype='application/json')

# static files 
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)
