from operator import attrgetter
import random
from random import randint

class Tutor:
    def __init__(self):
        self.username = ""
        self.la = 0
        self.hours = 0
        self.desired_shifts = 0
        self.preferences = []
        self.busy = []
        self.disciplines = []
        self.finished = False
        self.sheduled_shifts = []
        self.tie_breaker = 0

    def reset_rank(self):
        self.la = 0
        self.hours = 0

    def la_status(self, status):
        self.la = status

    def reset_schedule(self):
        self.scheduled_shifts = []

    def change_worked_hours(self, hours):
        self.hours = hours

    def change_desired_shifts(self, desired_shifts):
        self.desired_shifts = desired_shifts

    def add_preference(self, shift):
        self.preferences.append(shift)

    def cannot_work(self, shift):
        self.busy.append(shift)




def format_tutor(tutor_info):
    tutor_values = tutor_info.split()
    tutor = Tutor()
    tutor.username = tutor_values[0]
    tutor.la = int(tutor_values[1])
    tutor.hours = int(tutor_values[2])
    tutor.desired_shifts = int(tutor_values[3])
    tutor.preferences = []
    prefs = tutor_values[4].split("-")
    for pref in prefs:
        pref = pref.replace("(","")
        pref = pref.replace(")","")
        pref_split = pref.split(",")
        pref_split[0]
        preference = (pref_split[0],pref_split[1])
        tutor.preferences.append(preference)
    tutor_values[5]  = tutor_values[5].replace('[', "")
    tutor_values[5] = tutor_values[5].replace(']', "")
    busy_shifts = tutor_values[5].split(",")
    for shift in busy_shifts:
        tutor.busy.append(shift)
    disciplines = tutor_values[6].split(",")
    for discipline in disciplines:
        tutor.disciplines.append(discipline)
    tutor_list.append(tutor)


def schedule_tutors(tutors):
    time_list = ["2","4","6","8"]
    day_list = ["MON", "TUES", "WED", "THURS", "SUN"]
    discipline_list = ["MATH", "CHEM", "PHYSICS","M_BIOLOGY", "ECONOMICS", "COMPUTER_SCIENCE", "NEUROSCIENCE", "E_SCIENCE", "STATISTICS"]


    # Generate a randomized, non-repeating list of numbers from 0 -> num  of tutors - 1
    tie_breaker_list = random.sample(range(len(tutors)), len(tutors))
    counter = 0
    for tutor in tutors:
        # clear  each tutor's previous schedule
        tutor.reset_schedule()
        # assign a tie-breaker number to each tutor
        tutor.tie_breaker = tie_breaker_list[counter]
        counter += 1
    # Sort tutors by LA status, then number of hours worked, then their tie breaker number
    # Reverse the list order so the tutors with highest commitment level are hight in the list
    tutors = sorted(tutors, key = attrgetter('la','hours','tie_breaker'), reverse=True)

    conditional = True

    while conditional:
        # If any tutor's maximum desired shifts has not been reached...
        # print(any(t.finished == False for t in tutors))
        if any(t.finished == False for t in tutors):
            # Loop through all the tutors
            for tutor in tutors:
                # print(tutor.username, tutor.desired_shifts, tutor.finished)
                # Stop on the first "unfinished" tutor
                # If the tutor has already been assigned a shift for the "round"

                # Make sure that this tutor's max number of shifts has not been reached
                if tutor.desired_shifts > 0:
                    # If there are still shifts in their preferred shift list...
                    if len(tutor.preferences) > 0:
                        # print (tutor.preferences)
                        for pref in tutor.preferences[:]:
                            # print("entered pref loop")
                            # If another tutor is scheduled for the shift...
                            if any(pref in all_tutors.scheduled_shifts for all_tutors in tutors):
                                # Remove it from their preferences
                                tutor.preferences.remove(pref)
                                # print("found bad pref")
                            # If nobody is scheduled for the shift...
                            else:
                                # Schedule the current tutor for the shift and remove it from their preferences
                                # print("found good pref")
                                tutor.preferences.remove(pref)
                                tutor.scheduled_shifts.append(pref)
                                # print("Scheduled ", tutor.username, "for", pref)
                                break
                    # If all their preferred shifts have been claimed...
                    elif len(tutor.preferences) == 0:
                        # Generate random shift
                        rand_time = time_list[randint(0,len(time_list)-1)]
                        rand_day = day_list[randint(0,len(day_list)-1)]
                        rand_discipline = tutor.disciplines[randint(0,len(tutor.disciplines)-1)]
                        rand_shift = (rand_discipline, rand_day+rand_time)
                        # If another tutor is scheduled for the shift...
                        while any(rand_shift in every_tutor.scheduled_shifts for every_tutor in tutors):
                            # Generate new shift
                            rand_time = time_list[randint(0,len(time_list)-1)]
                            rand_day = day_list[randint(0,len(day_list)-1)]
                            rand_discipline = tutor.disciplines[randint(0,len(tutor.disciplines)-1)]
                            rand_shift = (rand_discipline, rand_day+rand_time)
                        # Once unassigned shift is found
                        tutor.scheduled_shifts.append(rand_shift)
                        # print("Scheduled ", tutor.username, "for", rand_shift, "randomly")

                        # print("Scheduled ", tutor.username, "for", rand_shift)
                    # Once this tutor's shift is assigned, lower their desired shift number by one and move onto the next tutor
                    tutor.desired_shifts -= 1
                # If a tutor desires no more shifts, mark them as finished
                else:
                    tutor.finished = True
                # If a tutor is finished do not assign them to any more shifts
        else:
            conditional = False
    return tutors







tutor_list = []

format_tutor("d_filmore 0 15 3 (COMPUTER_SCIENCE,MON2)-(COMPUTER_SCIENCE,TUES4)-(COMPUTER_SCIENCE,THURS8) [MON8,TUES6] COMPUTER_SCIENCE")
format_tutor("a_antonoffwertheimer 0 15 1 (COMPUTER_SCIENCE,TUES4)-(COMPUTER_SCIENCE,WED8) [] COMPUTER_SCIENCE,MATH")
format_tutor("s_dunbar 1 10 1 (ECONOMICS,MON6) [] ECONOMICS")
format_tutor("e_blair 0 5 3 (ECONOMICS,MON8)-(ECONOMICS,TUES8) [] ECONOMICS")

tutor_list = schedule_tutors(tutor_list)
for tutor in tutor_list:
    print (tutor.username, tutor.tie_breaker, tutor.scheduled_shifts)

# THINGS TO IMPLEMENT:
# cannot_work
# List of possible shifts - no random repeats!!!
