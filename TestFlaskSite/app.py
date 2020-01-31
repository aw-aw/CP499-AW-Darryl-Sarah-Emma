from flask import Flask, render_template, json, request

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/preferences')
def showPreferences():
    return render_template('preferences.html')

@app.route('/profile')
def showProfile():
    return render_template('profile.html')

if __name__ == "__main__":
    app.run()
