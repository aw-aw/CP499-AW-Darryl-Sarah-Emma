#Database creation script
import mysql.connector as mariadb

my_connection= mariadb.connect(user='root', passwd='')
my_cursor=my_connection.cursor(buffered = True)

my_cursor.execute("CREATE DATABASE qrcCal;")

my_database=mariadb.connect(user='root',passwd='',db='qrcCal')
my_db_cursor=my_database.cursor(buffered=True)

my_db_cursor.execute("CREATE TABLE users (username CHAR(50) NOT NULL, isLA BOOLEAN NOT NULL, isAdmin BOOLEAN NOT NULL, name CHAR(50), desiredShifts INT, PRIMARY KEY (username));")
my_db_cursor.execute("CREATE TABLE BusyShifts (id INT AUTO_INCREMENT NOT NULL, shift CHAR(50) NOT NULL, username CHAR(50) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (username) REFERENCES users(username));")
my_db_cursor.execute("CREATE TABLE assignedshifts (id INT AUTO_INCREMENT NOT NULL, shift CHAR(50) NOT NULL, username CHAR(50) NOT NULL, discipline CHAR(50) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (username) REFERENCES users(username));")
my_db_cursor.execute("CREATE TABLE preferredshifts (id INT AUTO_INCREMENT NOT NULL, shift CHAR(50), username CHAR(50) NOT NULL, discipline CHAR(50) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (username) REFERENCES users(username));")
my_db_cursor.execute("CREATE TABLE discipline (id INT AUTO_INCREMENT NOT NULL, discipline CHAR(50) NOT NULL, username CHAR(50) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (username) REFERENCES users(username));")
my_db_cursor.execute("CREATE TABLE currentBlock (id INT AUTO_INCREMENT NOT NULL, currentBlock CHAR(50) NOT NULL, PRIMARY KEY (id));")
