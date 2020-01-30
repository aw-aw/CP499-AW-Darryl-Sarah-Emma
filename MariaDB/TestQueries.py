#Testing the logic for queries into the database for the site
import mysql.connector as mariadb
conn=mariadb.connect(user='root',passwd='',db='qrcCal')
cursor=conn.cursor()

"""Check if the person logging in with CAS is a tutor, admin, or normal student"""
try:
    #grab the username from CAS and look for it in the users table (replace e_blair)
    check_user = "SELECT username FROM users WHERE username='e_blair'"
    cursor.execute(check_user)
    current_user = cursor.fetchone()
    #if the user is in the database, check if they are admin or tutor (current_user is not None)
    if current_user != None:
        admin_or_tutor = "SELECT isAdmin FROM users WHERE username='e_blair'" #replace e_blair
        cursor.execute(admin_or_tutor)
        admin_result = cursor.fetchone()
        print(admin_result)
        if admin_result == '0': #user is a tutor
            print("Show Tutor Page")
        else: #user is an admin
            print("Show Admin Page")
    else: #if the user is not in the database
        print("Show Normal Page")

except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

"""Tutor Home Page"""

"""Highlight days of the week where a tutor is working on the home screen"""
#put in a loop?
try: #make these into seperate functions that return something that allows UI to know what to do?
    check_monday = "SELECT day FROM assignedshifts WHERE username='e_blair' AND day='Monday'"
    cursor.execute(check_monday);
    work_monday = cursor.fetchall()
    if work_monday != None:
        print("Working Monday") #highlight Monday component on calendar
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

try:
    check_tuesday = "SELECT day FROM assignedshifts WHERE username='e_blair' AND day='Tuesday'"
    cursor.execute(check_tuesday);
    work_tuesday = cursor.fetchall()
    if work_tuesday != None:
        print("Working Tuesday") #highlight Tuesday component on calendar
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

try:
    check_wednesday = "SELECT day FROM assignedshifts WHERE username='e_blair' AND day='Wednesday'"
    cursor.execute(check_wednesday);
    work_wednesday = cursor.fetchall()
    if work_wednesday != None:
        print("Working Wednesday") #highlight Wednesday component on calendar
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

try:
    check_thursday = "SELECT day FROM assignedshifts WHERE username='e_blair' AND day='Thursday'"
    cursor.execute(check_thursday);
    work_thursday = cursor.fetchall()
    if work_thursday != None:
        print("Working Thursday") #highlight Thursday component on calendar
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

try:
    check_sunday = "SELECT day FROM assignedshifts WHERE username='e_blair' AND day='Sunday'"
    cursor.execute(check_sunday);
    work_sunday = cursor.fetchall()
    print(work_sunday)
    if work_sunday != None:
        print("Working Sunday") #highlight Sunday component on calendar
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

""" Filter Ability """
try: #see all currently scheduled math shifts
    select_math = "SELECT * from assignedshifts WHERE discipline='Mathematics'"
    cursor.execute(select_math)
    math_shifts = cursor.fetchall()
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))

try: #see all currently scheduled computer science ] shifts
    select_computerscience = "SELECT * from assignedshifts WHERE discipline='ComputerScience'"
    cursor.execute(select_computerscience)
    cp_shifts = cursor.fetchall()
except mariadb.Error as error:
    print("Failed to get record from database: {}".format(error))
