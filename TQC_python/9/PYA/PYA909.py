with open("data.dat", "a", encoding="utf-8") as f:
    for i in range(5):
        s = input()
        f.write(s + '\n')
print('The content of "data.dat":')
with open("data.dat", "r", encoding="utf-8") as f:
    for line in f:
        print(line)