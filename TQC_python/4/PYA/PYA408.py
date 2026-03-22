even = 0
odd = 0

for i in range(10):
    num = eval(input())
    if num % 2 == 0:
        even += 1
    else:
        odd += 1
print(f"Even numbers: {even}")
print(f"Odd numbers: {odd}")