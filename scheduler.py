from operator import attrgetter
import random
from random import randint

#Class that represents a tutor and all necessary processing information about a tutor
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



#This method takes in a string containing a tutor's information and adds the tutor to a global tutor list
# Formatted as follows:
    # "username la_status hours_worked_last_block desired_number_of_shifts (PREFERRED_SHIFT_DISCIPLINE,DAY_START_TIME)-(PREFERRED_SHIFT2_DISCIPLINE,DAY_START_TIME)-(ETC) [BUSY_SHIFT_DAY_START_TIME] DISCIPLINE,DISCIPLINE"
def format_tutor(tutor_info):
    #Create new tutor
    tutor = Tutor()

    #Grab each value by spaces
    tutor_values = tutor_info.split()
    #Assign values
    tutor.username = tutor_values[0]
    tutor.la = int(tutor_values[1])
    tutor.hours = int(tutor_values[2])
    tutor.desired_shifts = int(tutor_values[3])
    #Create new array to hold all tutor preference tuples
    tutor.preferences = []
    #Split string preferences by "-" delimiter
    prefs = tutor_values[4].split("-")
    #Format each preference
    for pref in prefs:
        #Remove unnecessary "()" from string
        pref = pref.replace("(","")
        pref = pref.replace(")","")
        pref_split = pref.split(",")
        preference = (pref_split[0],pref_split[1])
        #Add formatted preference tuple to list of preferences
        tutor.preferences.append(preference)
    #Format each busy shift
    #Remove unnecessary "[]"
    tutor_values[5]  = tutor_values[5].replace('[', "")
    tutor_values[5] = tutor_values[5].replace(']', "")
    busy_shifts = tutor_values[5].split(",")
    #Add each busy shift to tutor's busy shifts list
    for shift in busy_shifts:
        tutor.busy.append(shift)
    #Format each discipline
    #Split by comma delimiter
    disciplines = tutor_values[6].split(",")
    #Add each discipline to tutor's dsicipline list
    for discipline in disciplines:
        tutor.disciplines.append(discipline)

    #Add tutor object to list of all tutors
    tutor_list.append(tutor)

#This method takes in a list of tutors and assigns shifts to them
def schedule_tutors(tutors):
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
    tie_breaker_list = random.sample(range(len(tutors)), len(tutors))

    #Create counter to keep track of the tie_breaker to assign
    counter = 0
    #Assign each tutor a tie breaker number - if all stats are the same, randomly assign the order of picking
    for tutor in tutors:
        # clear  each tutor's previous schedule
        tutor.reset_schedule()
        # assign a tie-breaker number to each tutor
        tutor.tie_breaker = tie_breaker_list[counter]
        counter += 1
    # Sort tutors by LA status, then number of hours worked, then their tie breaker number
    # Reverse the list order so the tutors with highest commitment level are first in the list
    tutors = sorted(tutors, key = attrgetter('la','hours','tie_breaker'), reverse=True)

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
                        random_shifts = every_shift.copy()
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
    return tutors






#Testing the code

tutor_list = []

format_tutor("d_filmore 0 15 3 (COMPUTER_SCIENCE,MON6)-(COMPUTER_SCIENCE,TUES4)-(COMPUTER_SCIENCE,THURS8) [MON4,MON8,TUES2,TUES6,TUES8,WED2,WED4,WED6,WED8,THURS2,THURS4,THURS6,SUN2,SUN4,SUN6,SUN8] COMPUTER_SCIENCE")
format_tutor("a_antonoffwertheimer 0 15 1 (COMPUTER_SCIENCE,TUES4)-(COMPUTER_SCIENCE,WED8) [] COMPUTER_SCIENCE,MATH")
format_tutor("s_dunbar 1 10 1 (COMPUTER_SCIENCE,MON6) [] COMPUTER_SCIENCE")
format_tutor("e_blair 0 5 3 (COMPUTER_SCIENCE,MON8)-(COMPUTER_SCIENCE,TUES8) [] COMPUTER_SCIENCE")

tutor_list = schedule_tutors(tutor_list)
for tutor in tutor_list:
    print (tutor.username, tutor.tie_breaker, tutor.scheduled_shifts)
