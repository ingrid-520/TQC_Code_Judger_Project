# TODO

n = eval(input())
answer = 0
for i in range(1, n+1):
    if i % 5 == 0:
        answer += i

print(answer)
