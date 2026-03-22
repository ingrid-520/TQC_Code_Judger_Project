color = {}

while True:
    key = input()
    if key == "end":
        break
    value = input()
    color[key] = value

for k, v in sorted(color.items()):
    print(f'{k}: {v}')


