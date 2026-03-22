# TODO

n = eval(input())
for i in range(1, n+1):
    string = ""
    for j in range(1, i+1):
        string += f"{i*j:>4}" #對齊
    print(string)
