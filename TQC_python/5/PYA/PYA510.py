# TODO

num = eval(input())
def compute(num):
    list_f = [0, 1]
    for i in range(1, num - 1):
        list_f.append(list_f[i] + list_f[i-1])
    
    return " ".join(map(str, list_f)) 

print(compute(num))