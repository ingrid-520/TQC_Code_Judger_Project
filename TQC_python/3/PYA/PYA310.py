n = eval(input())
answer = 0
for i in range(1, n):
    denominator = (i**0.5) + ((i+1)**0.5)
    answer += 1/denominator

print(f"{answer:.4f}")