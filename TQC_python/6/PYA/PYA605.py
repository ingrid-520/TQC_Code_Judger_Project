list_input = []
total = 0
for i in range(10):
    list_input.append(eval(input()))
list_input.remove(max(list_input))
list_input.remove(min(list_input))
for j in list_input:
    total += j

print(total)
print(f"{total/len(list_input):.2f}")