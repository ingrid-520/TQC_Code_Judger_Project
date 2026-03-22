d = dict()
while True:
    key = input('')
    if key == 'end': break
    value = input('Value: ')
    d[key] = value
k = input('')
print(k in d)