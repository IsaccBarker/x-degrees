import json
from collections import Counter

likes=[]

data={}
with open("../database.json", "r") as f:
    data = json.load(f)

for person in data['people']:
    for person_likes in person['likes']:
        likes.append(person_likes)

results = [l for ls, c in Counter(likes).most_common()
        for l in [ls] * c]

# res = []
# [res.append(x) for x in results if x not in res]
# results = res

i = results.count(results[0])
prev = ""
for result in results:
    if prev == result:
        i = i + 1
        continue;

    print("mentioned: " + str(i) + ": " + str(result))
    prev = result
    i = 1
