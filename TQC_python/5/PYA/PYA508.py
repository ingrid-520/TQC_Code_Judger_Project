# TODO
x, y = eval(input())
def compute(x, y):
    list_x = []
    list_y = []
    for i in range(1, x+1):
        if x % i == 0:
            list_x.append(i)
    for j in range(1, y+1):
        if y % j == 0:
            list_y.append(j)
    set_x = set(list_x)
    set_y = set(list_y)
    answer = set_x.intersection(set_y)
    return max(answer)

print(compute(x, y))

