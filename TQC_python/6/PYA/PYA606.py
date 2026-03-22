# TODO
row = eval(input())
col = eval(input())

def compute(row, col):
    for i in range(row):
        for j in range(col):
            value = j - i
            print(f"{value:4}", end= "")
        print()
compute(row, col)