#!/usr/bin/python
import mysql.connector as mariadb
conn=mariadb.connect(user='root',passwd='',db='qrcCal')
cursor=conn.cursor()

#cursor.execute("CREATE TABLE test( id MEDIUMINT NOT NULL AUTO_INCREMENT, discipline CHAR(50) NOT NULL, username CHAR(50), PRIMARY KEY(id),FOREIGN KEY (username) REFERENCES users(username))")

try:
    sql_select_Query = "SELECT username FROM users WHERE isAdmin=0"
    cursor.execute(sql_select_Query)
    username=cursor.fetchone()
    print(username)

except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))
