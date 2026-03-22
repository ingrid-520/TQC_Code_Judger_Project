summary = []
for week in range(1, 5):
    print(f"Week {week}:")
    for day in range(1, 4):
        temperature = eval(input())
        summary.append(temperature)
        print(f"Day {day}: {temperature}")
    print("")
print(f"Average: {(sum(summary)/len(summary)):.2f}")
print(f"Highest: {max(summary)}")
print(f"Lowest: {min(summary)}")