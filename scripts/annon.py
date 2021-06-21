import json
import hashlib

data={}
with open("../database.json", "r") as f:
    data = json.load(f)

for person in data['people']:
    person['name'] = int(hashlib.sha256(person['name'].encode("utf-8")).hexdigest(), 16) % (10 ** 8)
    del person['number']
    
    i = 0
    for like in person['likes']:
        person['likes'][i] = int(hashlib.sha256(like.encode("utf-8")).hexdigest(), 16) % (10 ** 8)
        i = i + 1

with open("../database.annon.json", "w") as f:
    f.truncate()
    f.write(json.dumps(str(data), indent=4, sort_keys=True).replace("'", '"').replace('"{', '{').replace('}"', '}'))


annon_data=[]
data=[]
with open("../students.json", "r") as f:
    data = json.load(f)

i = 0
for person in data:
    annon_data.append(int(hashlib.sha256(person.encode('utf-8')).hexdigest(), 16) % (10 ** 8))
    i = i + 1


with open("../students.annon.json", "w") as f:
    f.truncate()
    f.write(json.dumps(str(annon_data), indent=4, sort_keys=True).replace("'", '"').replace('"[', '[').replace(']"', ']'))

