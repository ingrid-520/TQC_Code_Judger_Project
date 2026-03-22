matrix_1 = []
matrix_2 = []

print(f"Enter matrix 1")
for i in range(2):
    for j in range(2):
        num = eval(input())
        matrix_1.append(num)
        print("[%d, %d]: %d" % (i+1, j+1, num) , end = "")
        print("")

print(f"Enter matrix 2")
for i in range(2):
    for j in range(2):
        num = eval(input())
        matrix_2.append(num)
        print("[%d, %d]: %d" % (i+1, j+1, num) , end = "")
        print("")

print("Matrix 1:")
for i in matrix_1:
    print(f"{i} ", end="")
    if matrix_1.index(i) == 1 or matrix_1.index(i) == 3:
        print("")
print("Matrix 2:")
for i in matrix_2:
    print(f"{i} ", end="")
    if matrix_2.index(i) == 1 or matrix_2.index(i) == 3:
        print("")

print('Sum of 2 matrices:')
for i in range(4):
    total = matrix_1[i] + matrix_2[i]
    print(f"{total} ", end="")
    if i == 1 or i == 3:
        print("")