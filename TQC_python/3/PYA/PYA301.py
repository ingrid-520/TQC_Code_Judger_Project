# TODO

num1 = eval(input())
num2 = eval(input())
answer = 0

for i in range(min(num1, num2), max(num1, num2) + 1):
    answer += i

print(answer)