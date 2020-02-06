import sys
sys.path.insert(0, '/var/www/html/AwApp/flask_backend')

from AwApp import app as application
application.secret_key = '1234'
