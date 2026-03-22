data = {}
with open("PYD904_read.txt", "r") as f:
    for line in f:
        name, height, weight = line.split(" ")
        data[name] = {
            "height" : float(height),
            "weight" : float(weight),
        }

total_height = 0
total_weight = 0

for person in data:
    total_height += data[person]["height"]
    total_weight += data[person]["weight"]

avg_height = total_height / len(data) 
avg_weight = total_weight / len(data)

tallest = max(data, key=lambda x:data[x]["height"])
heaviest = max(data, key=lambda x:data[x]["weight"])

print(f"Average height: {avg_height:.2f}")
print(f"Average weight: {avg_weight:.2f}")
print(f"The tallest is {tallest} with {data[tallest]["height"]:.2f}cm")
print(f"The heaviest is {heaviest} with {data[heaviest]["weight"]:.2f}kg")