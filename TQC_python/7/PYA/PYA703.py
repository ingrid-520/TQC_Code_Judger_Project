position = tuple()


while True:
    n = input()
    if n == "end":
        break
    position += (n,)

print(position)
print(position[:3:])
print(position[-3:])
