from flask import Flask, render_template, json, request
from flask_cas import CAS, login_required, login
import random
import mysql.connector as mariadb
import logging

conn = mariadb.connect(user='root', passwd='', db='qrcCal')
cursor = conn.cursor()

app = Flask(__name__, static_folder="../react_frontend/build/static", template_folder="../react_frontend/build")
cas = CAS(app)
app.config['CAS_SERVER'] = 'https://cas.coloradocollege.edu/cas/'
app.config['CAS_AFTER_LOGIN'] = 'index'

@app.route('/')
@login_required
def index():
    username = cas.username
    in_database = "SELECT * FROM users WHERE username = \'" + username + "\';"
    cursor.execute(in_database)
    if cursor.fetchone() == None:
        return render_template('index.html', type = "normal")
    else:
        is_admin = "SELECT isAdmin FROM users WHERE username = \'" + username + "\';"
        cursor.execute(is_admin)
        if cursor.fetchone()[0] == 0:
            return render_template('index.html', type = "tutor")
        else:
            return render_template('index.html', type = "admin")

if __name__=="__main__":
    app.run()

