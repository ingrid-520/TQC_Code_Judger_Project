# TODO

total = 0

for i in range(5):
    poker = input()
    if poker == "K":
        total += 13
    elif poker == "Q":
        total += 12
    elif poker == "J":
        total += 11
    elif poker == "A":
        total += 1
    else:
        total += int(poker)

print(total)