# TODO

list_input = []
for i in range(10):
    list_input.append(eval(input()))

list_input = sorted(list_input, reverse= True)
answer = [str(list_input[i]) for i in range(3)]
print(" ".join(answer))

