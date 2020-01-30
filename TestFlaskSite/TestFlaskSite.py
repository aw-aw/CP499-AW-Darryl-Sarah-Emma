from flask import Flask, render_template, json, request
from flask_cas import CAS
from flask_cas import login
from flask_cas import logout
from flask_cas import login_required
import logging

app = Flask(__name__)
CAS(app)
app.config['CAS_SERVER'] = 'https://cas.coloradocollege.edu/'
app.config['CAS_AFTER_LOGIN'] = '/'



@app.route('/')
@login_required
def route_root():
    return flask.render_template('index.html')

@app.route('/preferences')
def showPreferences():
    return render_template('preferences.html')

@app.route('/profile')
def showProfile():
    return render_template('profile.html')

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'

    #sess.init_app(app)

    app.debug = True
    app.run()
