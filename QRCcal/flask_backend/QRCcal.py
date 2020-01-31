from flask import Flask, render_template, json, request

app = Flask(__name__, static_folder="../react_frontend/build/static", template_folder="../react_frontend/build")

@app.route('/')
def index():
    return render_template('index.html')

if __name__=="__main__":
    app.run()
