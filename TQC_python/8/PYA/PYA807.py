five = input().split(" ")
total = 0
for i in five:
    total += int(i)

print(f"Total = {total}")
print(f"Average = {(total/len(five)):.1f}")
