dict_1 = {}
dict_2 = {}

print('Create dict1:')
while True:
    key = input()
    if key == "end":
        break
    value = input()
    if value == "end":
        break
    dict_1[key] = value
print(dict_1)
print('Create dict2:')
while True:
    key = input()
    if key == "end":
        break
    value = input()
    if value == "end":
        break
    dict_2[key] = value
print(dict_2)
dict_1.update(dict_2)
result = dict(sorted(dict_1.items()))

print(result)