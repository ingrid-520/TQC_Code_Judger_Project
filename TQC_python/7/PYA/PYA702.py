nums_1 = tuple()
nums_2 = tuple()
for i in range(1, 3):
    print(f"Create tuple{i}")
    while True:
        n = eval(input())
        if n == -9999:
            break
        if i == 1:
            print(n)
            nums_1 += (n,)
        elif i == 2:
            print(n)
            nums_2 += (n,)
print(f"Combined tuple before sorting: {nums_1 + nums_2}")
print(f"Combined list after sorting: {sorted(list(nums_1 + nums_2))}")
