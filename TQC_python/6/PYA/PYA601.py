list_input = []
total = 0
count = 0
for i in range(12):
    list_input.append(eval(input()))
    print(f"{list_input[i]:>3}", end="")
    if (i+1) % 3 == 0:
        print("")
    if i % 2 == 0:
        total += list_input[i]
print(total)