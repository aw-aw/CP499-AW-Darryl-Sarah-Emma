#!/usr/bin/python
from flask import Flask, render_template, json, request, jsonify
from flask_cas import CAS
from flask_cas import login_required
from flask_cas import login
import mysql.connector as mariadb
from operator import attrgetter
import random
from random import randint

#Class that represents a tutor and all necessary processing information about a tutor
class Tutor:
    def __init__(self,username,fullName,isLa,isAdmin,numberShifts,desiredShifts):
        self.username = username
        self.la = isLa
        self.fullName=name
        self.admin=isAdmin
        self.hours = 2*numberShifts
        self.desired_shifts = desiredShifts
        self.preferences = []
        self.busy = []
        self.disciplines = []
        self.finished = False
        self.sheduled_shifts = []
        self.tie_breaker = 0

    def reset_rank(self):
        self.la = 0
        self.hours = 0

    # def get_username(self):
    #     return self.username
    #
    # def set_username(self, username):
    #     self.username=username
    #
    # def get_name(self):
    #     return self.fullName
    #
    # def set_name(self,fullName):
    #     self.fullName=fullName
    #
    # def get_La(self):
    #     return self.la
    #
    # def set_La(self,isLa):
    #     self.la=isLa
    #
    # def get_Admin(self):
    #     return self.admin
    #
    # def set_Admin(self,isAdmin):
    #     self.admin=isAdmin
    #
    # def get_numberShifts(self):
    #     return self.numberShifts
    #
    # def set_numberShifts(self,numberShifts):
    #     self.numberShifts=numberShifts
    #
    # def get_desiredShifts(self):
    #     return self.desired_shifts
    #
    # def set_desiredShifts(self,desiredShifts):
    #     self.desired_shifts=desiredShifts
    #
    # def get_hours(self):
    #     return self.hours
    #
    # def set_hours(self,numberShifts):
    #     self.hours=numberShifts*2


#This method takes in a list of tutors and assigns shifts to them
def schedule_tutors(tutors_list):
    #Every time assign tutors, need to wipe previous clean
    cursor.execute("DELETE FROM assignedshifts;")
    #Necessary for deleting to be done
    conn.commit()
    #Lists of all possible start_times, days, and disciplines for QRC shifts
    time_list = ["2","4","6","8"]
    day_list = ["MON", "TUES", "WED", "THURS", "SUN"]
    discipline_list = ["MATH", "CHEM", "PHYSICS","M_BIOLOGY", "ECONOMICS", "COMPUTER_SCIENCE", "NEUROSCIENCE", "E_SCIENCE", "STATISTICS"]

    #Create a list with every possible shift
    every_shift = []
    for discipline in discipline_list:
        for day in day_list:
            for time in time_list:
                shift = (discipline, day+time)
                every_shift.append(shift)

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

    #Set a variable to tell if the assigning is complete
    finished_assigning = True
    #If assigning is not complete...
    while finished_assigning:
        # If any tutor's maximum desired shifts has not been reached...
        if any(t.finished == False for t in tutors):
            # Loop through all the tutors in "rounds"
            for tutor in tutors:
                # Stop on the first tutor that is still looking for shifts
                if tutor.desired_shifts > 0:
                    # If there are still shifts in their preferred shift list...
                    if len(tutor.preferences) > 0:
                        #iterate through every shift in preferences (make a copy so that the loop functions reliably)
                        for pref in tutor.preferences[:]:
                            # If another tutor is scheduled for the shift...
                            if any(pref in all_tutors.scheduled_shifts for all_tutors in tutors):
                                # Remove it from the current tutor's preferences
                                tutor.preferences.remove(pref)
                            # If nobody is scheduled for the shift...
                            else:
                                # Schedule the current tutor for the shift and remove it from their preferences
                                tutor.preferences.remove(pref)
                                # Since the shift is assigned, remove it from the list of possible shifts
                                every_shift.remove(pref)
                                tutor.scheduled_shifts.append(pref)
                                # Since the current tutor has been scheduled for a shift, lower their desired shifts by one
                                tutor.desired_shifts -= 1
                                # Finish this tutor's turn
                                break
                    # If all their preferred shifts have been claimed...
                    elif len(tutor.preferences) == 0:
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
                            # If the shift's discipline is one of the tutor's disciplines
                            if shift[0] in tutor.disciplines:
                                # If no tutors are scheduled for the shift, and the current tutor is not busy at the time of the shift...
                                if not any(shift in every_tutor.scheduled_shifts for every_tutor in tutors) and not (shift[1] in tutor.busy):
                                    # Schedule the current tutor for the shift
                                    tutor.scheduled_shifts.append(shift)
                                    # Since the shift is assigned, remove it from the list of possible shifts
                                    every_shift.remove(shift)
                                    # Since the current tutor has been scheduled for a shift, lower their desired shifts by one
                                    tutor.desired_shifts -= 1
                                    # Finish this tutor's turn
                                    break
                            # If the program has tried to schedule the tutor for every open shift
                            if attempted_shifts == len(random_shifts):
                                # Mark the tutor as finished - they cannot possibly take any more shifts
                                tutor.desired_shifts = 0
                                tutor.finished = True
                # If a tutor desires no more shifts, mark them as finished
                else:
                    tutor.finished = True
        # If a tutor is finished do not assign them to any more shifts
        else:
            finished_assigning = False
    #When every tutor has been scheduled, return the updated list of tutors
    for tutor in tutors_list:
        for shift in tutor.scheduled_shifts:
            cursor.execute("INSERT INTO assignedshifts(username,discipline,shift) VALUES(%s,%s,%s);",(tutor.username,shift[0],shift[1]))
            conn.commit()
    cursor.execute("DELETE FROM preferredshifts;")
    conn.commit()

tutor_list=[]

conn=mariadb.connect(user='root',passwd='',db='qrcCal')
cursor=conn.cursor(buffered = True)
cursor.execute("SELECT * FROM users;")
for row in cursor:
    username = row[0].encode('ascii','ignore')
    numberShifts=row[1]
    isLa=row[2]
    isAdmin=row[3]
    name=row[4].encode('ascii','ignore')
    desiredShifts=row[5]
    tutor=Tutor(username,name,isLa,isAdmin,numberShifts,desiredShifts)
    tutor_list.append(tutor)

cursor.execute("SELECT * FROM discipline;")
for row in cursor:
    discipline=row[1].encode('ascii','ignore')
    for tutor in tutor_list:
        if tutor.username==row[2]:
            tutor.disciplines.append(discipline)
            break
cursor.execute("SELECT * FROM preferredshifts;")
for row in cursor:
    shift=row[1].encode('ascii','ignore')
    discipline=row[3].encode('ascii','ignore')
    for tutor in tutor_list:
        if tutor.username==row[2]:
            pref_shift=(discipline,shift)
            tutor.preferences.append(pref_shift)
            break
cursor.execute("SELECT * FROM BusyShifts;")
for row in cursor:
    shift=row[1].encode('ascii','ignore')
    for tutor in tutor_list:
        if tutor.username==row[2]:
            tutor.busy.append(shift)
            break

app = Flask(__name__,static_folder="../react_frontend/build/static", template_folder="../react_frontend/build")
cas = CAS(app)
app.config['CAS_SERVER'] = 'https://cas.coloradocollege.edu/cas'
app.config['CAS_AFTER_LOGIN'] = 'secure'

@app.route('/')
@login_required
def index():
    return render_template('index.html', token="token")

@app.route('/preferences', methods=['POST', 'GET'])
@login_required
def grabShifts():
    shift = request.form['variable']
    req = "SELECT * FROM preferredshifts WHERE shift =" + "\'" +  shift + "\'" + ";"
    cursor.execute(req)
    string=''
    for row in cursor:
        print (row[2])
        string += row[2]
        string += row[3]
    try:
       cursor.fetchall() 
    except sqlite3.Error as error:
        print("Failed to read data from table", error)
    return string

if __name__=="__main__":
    app.run(debug=True)
