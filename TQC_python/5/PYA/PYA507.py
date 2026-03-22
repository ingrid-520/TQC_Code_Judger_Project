num = int(input())
def compute(num):
    check = 0
    for i in range(1, num + 1):
        if num % i == 0:
            check += 1
    if check == 2:
        return "Prime"
    else:
        return "Not Prime"
        
print(compute(num))