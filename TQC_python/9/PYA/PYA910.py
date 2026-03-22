gender = []
with open("PYD910_read.dat", "r", encoding="utf-8") as f:
    for line in f:
        print(line)
        data = line.strip().split(" ")
        gender.append(data[2])

print(f'Number of males: {gender.count("1")}')
print(f'Number of females: {gender.count("0")}')
