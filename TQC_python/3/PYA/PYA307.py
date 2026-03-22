n = eval(input())
for i in range(1, n+1):
    for j in range(1, n+1):
        print(f"{j} * {i} = {i*j:<4}", end="")
    print("")