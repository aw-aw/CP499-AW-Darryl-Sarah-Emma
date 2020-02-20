from flask import Flask, render_template, json, request, jsonify, redirect, url_for, make_response
from flask_cors import CORS, cross_origin
from flask_cas import CAS
from flask_cas import login_required
from flask_cas import login
import mysql.connector as mariadb
from operator import attrgetter
import random
from random import randint


#Class that represents a tutor and all necessary processing information about a tutor
class Tutor:
    def __init__(self,username,name,isLa,isAdmin,desiredShifts):
        self.username = username
        self.la = isLa
        self.fullName=name
        self.admin=isAdmin
        self.hours = 0
        self.desired_shifts = desiredShifts
        self.preferences = []
        self.busy = []
        self.disciplines = []
        self.finished = False
        self.sheduled_shifts = []
        self.tie_breaker = 0
        self.legal_prefs = []

    def reset_rank(self):
        self.la = 0
        self.hours = 0

#This method takes in a list of tutors and assigns shifts to them
def scheduleTutors(tutors_list):
    conn = mariadb.connect(user='root', passwd='', db='qrcCal')
    cursor=conn.cursor(buffered = True)
    #Every time assign tutors, need to wipe previous clean
    cursor.execute("DELETE FROM assignedshifts;")
    #Necessary for deleting to be done
    conn.commit()
    #Lists of all possible start_times, days, and disciplines for QRC shifts
    time_list = ["2","4","6","8"]
    day_list = ["MON", "TUES", "WED", "THURS", "SUN"]
    discipline_list = ["MATH", "CHEM", "PHYSICS","M_BIOLOGY", "ECONOMICS", "COMPUTER_SCIENCE", "NEUROSCIENCE", "E_SCIENCE", "STATISTICS"]

    discipline_converter = {"MATH":"M", "CHEM":"Ch", "PHYSICS":"P", "M_BIOLOGY":"Ch", "ECONOMICS":"E", "COMPUTER_SCIENCE":"CS", "NEUROSCIENCE":"Ch", "E_SCIENCE":"Ch", "STATISTICS":"M"}
    #Create a list with every possible shift
    every_shift = [("Ch","SUN2"),("M", "SUN2"),("E","SUN2"),("Ch","Sun4"),("CS","SUN4"),("E","SUN4"),("M","SUN4"),("P","SUN4"),("Ch","SUN6"),("CS","SUN6"),("M","SUN6"),("Ch","SUN8"),("CS","SUN8"),("E","SUN8"),("M","SUN8"),("P","SUN8"),
                  ("M","MON2"),("Ch","MON4"),("CS","MON4"),("P","MON4"),("Ch","MON6"),("E","MON6"),("M","MON6"),("Ch","MON8"),("CS","Mon8"),("E","MON8"),("M","MON8"),("P","MON8"),
                  ("M","TUES2"),("Ch","TUES4"),("CS","TUES4"),("E","TUES4"),("M","TUES4"),("P","TUES4"),("Ch","TUES6"),("M","TUES6"),("P","TUES6"),("Ch","TUES8"),("CS","TUES8"),("E","TUES8"),("P","TUES8"),
                  ("M","WED2"),("Ch","WED4"),("CS","WED4"),("E","WED4"),("M","WED4"),("P","WED4"),("Ch","WED6"),("CS","WED6"),("M","WED6"),("Ch","WED8"),("CS","WED8"),("E","WED8"),("M","WED8"),("P","WED8"),
                  ("M","THURS2"),("Ch","THURS4"),("CS","THURS4"),("E","THURS4"),("M","THURS4"),("P","THURS4"),("Ch","THURS6"),("CS","THURS6"),("E","THURS6"),("M","THURS6"),("Ch","THURS8"),("CS","THURS8"),("E","THURS8"),("M","THURS8"),("P","THURS8")]
    #for discipline in discipline_list:
    #    for day in day_list:
    #        for time in time_list:
    #            shift = (discipline, day+time)
    #            every_shift.append(shift)

    # Generate a randomized, non-repeating list of numbers from 0 -> num  of tutors - 1
    tie_breaker_list = random.sample(range(len(tutors_list)), len(tutors_list))

    #Create counter to keep track of the tie_breaker to assign
    counter = 0
    #Assign each tutor a tie breaker number - if all stats are the same, randomly assign the order of picking
    for tutor in tutors_list:
        # clear  each tutor's previous schedule
        tutor.scheduled_shifts = []
        # assign a tie-breaker number to each tutor
        tutor.tie_breaker = tie_breaker_list[counter]
        counter += 1
    # Sort tutors by LA status, then number of hours worked, then their tie breaker number
    # Reverse the list order so the tutors with highest commitment level are first in the list
    tutors = sorted(tutors_list, key = attrgetter('la','hours','tie_breaker'), reverse=True)
    for tutor in tutors:
        tutor_possible_shifts = []
        for pref in tutor.preferences[:]:
            for discipline in tutor.disciplines:
                temp_pref = (discipline_converter[discipline], pref)
                if temp_pref in every_shift:
                    tutor_possible_shifts.append(temp_pref)
        tutor.legal_prefs = tutor_possible_shifts

    #Set a variable to tell if the assigning is complete
    still_assigning = True
    #If assigning is not complete...
    while still_assigning:
        # If any tutor's maximum desired shifts has not been reached...
        if any(t.finished == False for t in tutors):
            # Loop through all the tutors in "rounds"
            for tutor in tutors:
                print(tutor.fullName, str(tutor.desired_shifts), tutor.preferences, tutor.disciplines)
                # Stop on the first tutor that is still looking for shifts
                if tutor.desired_shifts > 0:
                    # If there are still shifts in their preferred shift list...
                    if len(tutor.legal_prefs) > 0:
                        #iterate through every shift in preferences (make a copy so that the loop functions reliably)
                        for pref in tutor.legal_prefs[:]:
                            # If another tutor is scheduled for the shift...
                            if any(pref in all_tutors.scheduled_shifts for all_tutors in tutors) or any(pref[1] in scheduled_shift[1] for scheduled_shift in tutor.scheduled_shifts):
                                # Remove it from the current tutor's preferences
                                tutor.legal_prefs.remove(pref)
                                every_shift.remove(pref)
                            # If nobody is scheduled for the shift...
                            else:
                                # Schedule the current tutor for the shift and remove it from their preferences
                                tutor.legal_prefs.remove(pref)
                                # Since the shift is assigned, remove it from the list of possible shifts
                                every_shift.remove(pref)
                                tutor.scheduled_shifts.append(pref)
                                # Since the current tutor has been scheduled for a shift, lower their desired shifts by one
                                tutor.desired_shifts -= 1
                                # Finish this tutor's turn
                                break
                    # If all their preferred shifts have been claimed...
                    elif len(tutor.legal_prefs) == 0:
                        # Randomly order the list of every possible shift
                        # random_shifts = every_shift.copy()
                        random_shifts = every_shift[:]
                        random.shuffle(random_shifts)

                        # Keep track of the number of times the scheduler has attempted to schedule the tutor in this turn
                        attempted_shifts = 0;
                        # Loop through every shift in the randomized list of possible shifts
                        for shift in random_shifts:
                            # Attempt to schedule again...
                            attempted_shifts += 1
                            for discipline in tutor.disciplines:
                                short_discipline = discipline_converter[discipline]
                                    # If the shift's discipline is one of the tutor's disciplines
                                if shift[0] == short_discipline:
                                    # If no tutors are scheduled for the shift, and the current tutor is not busy at the time of the shift...
                                    if not any(shift in every_tutor.scheduled_shifts for every_tutor in tutors) and not (shift[1] in tutor.busy) and not any(shift[1] in scheduled_shift[1] for scheduled_shift in tutor.scheduled_shifts):
                                        # Schedule the current tutor for the shift
                                        tutor.scheduled_shifts.append(shift)
                                        # Since the shift is assigned, remove it from the list of possible shifts
                                        every_shift.remove(shift)
                                        # Since the current tutor has been scheduled for a shift, lower their desired shifts by one
                                        tutor.desired_shifts -= 1
                                        # Finish this tutor's turn
                                        break
                            else:
                                # If the program has tried to schedule the tutor for every open shift
                                if attempted_shifts == len(random_shifts):
                                    # Mark the tutor as finished - they cannot possibly take any more shifts
                                    tutor.desired_shifts = 0
                                    tutor.finished = True
                                continue
                            break
                # If a tutor desires no more shifts, mark them as finished
                else:
                    tutor.finished = True
        # If a tutor is finished do not assign them to any more shifts
        else:
            still_assigning = False
    #When every tutor has been scheduled, return the updated list of tutors
    for tutor in tutors_list:
        for shift in tutor.scheduled_shifts:
            cursor.execute("INSERT INTO assignedshifts(username,discipline,shift) VALUES(%s,%s,%s);",(tutor.username,shift[0],shift[1]))
            conn.commit()
    cursor.execute("DELETE FROM preferredshifts;")
    conn.commit()
    cursor.execute("DELETE FROM BusyShifts;")
    conn.commit()
    cursor.execute("UPDATE users SET isLa = \'0\';")
    conn.commit()
    cursor.execute("UPDATE users SET desiredShifts = \'0\';")
    conn.commit()

def populateTutors():
    conn = mariadb.connect(user='root', passwd='', db='qrcCal')
    cursor=conn.cursor(buffered = True)
    tutor_list = []

    cursor.execute("SELECT * FROM users;")
    for row in cursor:
        username = row[0]
        isLa=row[1]
        isAdmin=row[2]
        name=row[3]
        if type(row[4]) == type(None):
            desiredShifts = 0
        else:
            desiredShifts=row[4]
        tutor=Tutor(username,name,isLa,isAdmin,desiredShifts)
        tutor_list.append(tutor)

    cursor.execute("SELECT * FROM discipline;")
    for row in cursor:
        discipline=row[1]
        for tutor in tutor_list:
            if tutor.username==row[2]:
                tutor.disciplines.append(discipline)
                break
    cursor.execute("SELECT * FROM preferredshifts;")
    for row in cursor:
        shift=row[1]
        for tutor in tutor_list:
            if tutor.username==row[2]:
                tutor.preferences.append(shift)
                break
    cursor.execute("SELECT * FROM assignedshifts;")
    for row in cursor:
        for tutor in tutor_list:
            if tutor.username==row[1]:
                tutor.hours += 2;
    cursor.execute("SELECT * FROM BusyShifts;")
    for row in cursor:
        shift=row[1]
        for tutor in tutor_list:
            if tutor.username==row[2]:
                tutor.busy.append(shift)
                break

    return tutor_list

tutor_list=[]

app = Flask(__name__, static_folder="../react_frontend/build/static", template_folder="../react_frontend/build")
cors = CORS(app)
cas = CAS(app)
app.config['CAS_SERVER'] = 'https://cas.coloradocollege.edu/cas/'
app.config['CAS_AFTER_LOGIN'] = 'index'

@app.route('/')
@login_required
def index():
    username = cas.username

    conn = mariadb.connect(user='root', passwd='', db='qrcCal')
    cursor=conn.cursor(buffered = True)

    username = cas.username
    in_database = "SELECT * FROM users WHERE username = \'" + username + "\';"
    cursor.execute(in_database)
    if cursor.fetchone() == None:
        resp = make_response(render_template('index.html', type = "normal", user_name = username))
    else:
        is_admin = "SELECT isAdmin FROM users WHERE username = \'" + username + "\';"
        cursor.execute(is_admin)
        if cursor.fetchone()[0] == 0:
            resp = make_response(render_template('index.html', type = "tutor", user_name = username))
        else:
            resp = make_response(render_template('index.html', type = "admin", user_name = username))
    try:
        cursor.fetchall()
    except mariadb.Error as error:
        error = "error occurred"
    return resp

@app.route('/post', methods=['POST', 'GET'])
def postRequest():
    type = request.form['category']
    req = request.form['input']
    string=''
    # type formatting: filename_what_request_does
    # This gets all the prefered shifts for all tutors for a certain day
    if type == "get_pref_shifts":
        pref_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        pref_cursor = pref_conn.cursor(buffered=True)
        pref_cursor.execute(req)
        all_data = []
        for row in pref_cursor:
            user_name = row[2]
            shift = row[1]
            all_data.append([user_name, shift])
        for entry in all_data:
            pref_cursor.execute("SELECT name FROM users WHERE username = \'" + entry[0] + "\';")
            full_name = pref_cursor.fetchone()[0];
            entry.append(full_name)
            string += full_name + ": " + entry[1] + ": "
            discipline_conn=mariadb.connect(user='root',passwd='',db='qrcCal')
            discipline_cursor=discipline_conn.cursor(buffered=True)
            discipline_cursor.execute("SELECT discipline FROM discipline WHERE username=\'" + entry[0] + "\';")
            for value in discipline_cursor:
                discipline=value[0]
                entry.append(discipline)
            for i in range(3,len(entry)):
                string+=entry[i] + " "
            discipline_cursor.close()
            discipline_conn.close()
            string+="\n"
        pref_cursor.close()
        pref_conn.close()
    # This get a list of all the tutor's disciplines; primarily meant for a dropdown menu
    elif type == "disciplines_dropdown":
        disc_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        disc_cursor = disc_conn.cursor(buffered=True)
        disc_cursor.execute(req)
        curr_discp = ""
        for row in disc_cursor:
            string += row[0] + " "
        disc_cursor.close()
        disc_conn.close()
    # This handles the request from any button; there is no need for a return"
    elif type == "button":
        sched_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        sched_cursor = sched_conn.cursor(buffered=True)
        sched_cursor.execute(req)
        sched_conn.commit()
        sched_cursor.close()
        sched_conn.close()
    elif type == "add_user":
        sched_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        sched_cursor = sched_conn.cursor(buffered=True)
        try:
            sched_cursor.execute(req)
            sched_conn.commit()
            string = "success"
        except mariadb.IntegrityError as err:
            string = "fail"
        sched_cursor.close()
        sched_conn.close()
    # This handles the request from the schedule tutors button, there is no need for a return
    elif type == "schedule_shifts":
        sched_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        sched_cursor = sched_conn.cursor(buffered=True)
        sched_cursor.execute(req)
        # Call methods to actually schedule tutors
        tutor_list = populateTutors()
        scheduleTutors(tutor_list)
        sched_conn.commit()
        sched_cursor.close()
        sched_conn.close()
    # This gets all the assigned shifts to the tutor
    elif type == "get_assigned_shifts":
        assigned_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        assigned_cursor = assigned_conn.cursor(buffered=True)
        assigned_cursor.execute(req)
        all_data = []
        for row in assigned_cursor:
            shift = row[1]
            username = row[2]
            discipline = row[3]
            all_data.append([shift,username, discipline])
        for entry in all_data:
            assigned_cursor.execute("SELECT name FROM users WHERE username = \'" + entry[1] + "\';")
            full_name = assigned_cursor.fetchone()[0];
            string += full_name + ": " + entry[0] + ": " + entry[2] + "\n"
        assigned_cursor.close()
        assigned_conn.close()
    # This gets a list of the tutor's disciplines; meant for pure displaying of them
    elif type == "get_discipline_list":
        list_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        list_cursor = list_conn.cursor(buffered=True)
        list_cursor.execute(req)
        for row in list_cursor:
            discipline = row[1]
            string += discipline + "\n"
        list_cursor.close()
        list_conn.close()
    # This gets a list of all the usernames of the tutors
    elif type == "get_username":
        users_list_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        users_list_cursor = users_list_conn.cursor(buffered=True)
        users_list_cursor.execute(req)
        for row in users_list_cursor:
            username = row[0]
            string += username + " "
        users_list_cursor.close()
        users_list_conn.close()
    # This gets the current block
    elif type == "get_current_block":
        block_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        block_cursor = block_conn.cursor(buffered=True)
        block_cursor.execute(req)
        string = str(block_cursor.fetchone()[0]);
        block_cursor.close()
        block_conn.close()
    elif type == "get_next_block":
        next_block_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        next_block_cursor = next_block_conn.cursor(buffered=True)
        next_block_cursor.execute(req)
        block_number = next_block_cursor.fetchone()
        if block_number[0] == 8:
           string = "1"
        else:
           string = str(block_number[0] + 1)
        next_block_cursor.close()
        next_block_conn.close()
    # This determines if the tutor was an LA last block or not
    elif type == "get_la_status":
        la_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        la_cursor = la_conn.cursor(buffered=True)
        la_cursor.execute(req)
        for row in la_cursor:
           isLA = row[1]
           if isLA == 0:
            string += "No"
           elif isLA == 1:
            string  += "Yes"
        la_cursor.close()
        la_conn.close()
    # This gets the number of shifts the tutor worked in the current (not preferences) block
    elif type == "get_last_shifts":
        shift_conn =mariadb.connect(user='root',  passwd='',db='qrcCal')
        shift_cursor = shift_conn.cursor(buffered=True)
        hours = 0
        shift_cursor.execute(req)
        for row in shift_cursor:
            hours += 2
        shift_cursor.close()
        shift_conn.close()
        return str(hours)
    # This gets the maximum number of shifts the tutor can work
    elif type == "get_max_shifts":
        max_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        max_cursor = max_conn.cursor(buffered=True)
        max_cursor.execute(req)
        for row in max_cursor:
            string += "Current = " + str(row[0])
        max_cursor.close()
        max_conn.close()
    elif type == "get_all_tutors":
        all_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        all_cursor = all_conn.cursor(buffered=True)
        all_cursor.execute(req)
        for row in all_cursor:
            string += row[3]+ ": " + row[0] + "\n"
        all_cursor.close()
        all_conn.close()
    elif type == "clear_tutor":
        delete_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        delete_cursor = delete_conn.cursor(buffered=True)
        all_requests = req.split('$')
        for r in all_requests:
            delete_cursor.execute(r)
            delete_conn.commit()
        delete_cursor.close()
        delete_conn.close()
    elif type == "get_busy_shifts":
        busy_conn = mariadb.connect(user='root', passwd='', db='qrcCal')
        busy_cursor = busy_conn.cursor(buffered=True)
        busy_cursor.execute(req)
        all_data = []
        for row in busy_cursor:
            shift = row[1]
            username = row[2]
            all_data.append([shift,username])
        for entry in all_data:
            busy_cursor.execute("SELECT name FROM users WHERE username = \'" + entry[1] + "\';")
            full_name = busy_cursor.fetchone()[0];
            string += full_name + ": " + entry[0] + "\n"
        busy_cursor.close()
        busy_conn.close()
    elif type== "updated_user":
        updated_conn=mariadb.connect(user='root',passwd='',db='qrcCal')
        updated_cursor=updated_conn.cursor(buffered=True)
        print(req)
        updated_cursor.execute(req)
        updated_conn.commit()
        updated_cursor.close()
        updated_conn.close()
    return string


if __name__=="__main__":
    app.run(debug=True)
