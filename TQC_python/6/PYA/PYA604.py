
list_input = []
dictionary = {}
for i in range(10):
    list_input.append(eval(input()))

for i in list_input:
    dictionary[str(i)] = list_input.count(i)
    # print(i, list_input.count(i))

print(max(dictionary, key=dictionary.get))
print(max(dictionary.values()))