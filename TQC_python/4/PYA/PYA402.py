# TODO

list_input = []
while True:
    input_num = eval(input())
    list_input.append(input_num)
    if input_num == 9999:
        break
print(min(list_input))
