a = input()
x = eval(input())
y = eval(input())
def compute(a, x, y):
    for i in range(y):
        row = ""
        for j in range(x):
            row = row + a + " "
        print(row)

compute(a, x, y)