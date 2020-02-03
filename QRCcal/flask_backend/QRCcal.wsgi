import sys
import os

sys.path.insert(0, '/var/www/html/QRCcal/flask_backend')

from QRCcal import app as application
application.secret_key = os.urandom(16).hex()
