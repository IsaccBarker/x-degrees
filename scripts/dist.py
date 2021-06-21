import json
import random

def pick_random(person):
    random_like = random.choice(person['likes'])
    if random_like not in people_queried:
        return pick_random(person)

    return random_like

def name_to_data(wanted, data):
    i = 0
    for name in data['people']:
        if name['name'] == wanted:
            return data['people'][i]
        i = i + 1

    print(wanted + " not found! Exiting")
    exit(1)


data = {}
people = []
people_queried = []

with open("../database.json", "r") as f:
    data = json.load(f)

for person in data['people']:
    people.append(person['name'])
    people_queried.append(person['name'])
    for like in person['likes']:
        people.append(like)

res = []
[res.append(x) for x in people if x not in res]
people = res

all_steps = []
while True:
    end = random.choice(data['people'])
    start = random.choice(data['people'])
    steps = 0
    while True:
        random_person = ""
        while True:
            steps += 1
            try:
                random_person = pick_random(start)
                start = name_to_data(random_person, data)
            except:
                start = random.choice(data['people'])
                steps = 0
            finally:
                if start['name'] == end['name']:
                    break
        break;

    all_steps.append(steps)
    x = 0
    for s in all_steps:
        x += s

    print("\r\033[A\033[Kaverage: " + str(x / len(all_steps)))
    continue

