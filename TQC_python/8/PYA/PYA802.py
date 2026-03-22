word = input()
total = 0
for i in word:
    print(f"ASCII code for '{i}' is {ord(i)}")
    total += ord(i)
print(total)
