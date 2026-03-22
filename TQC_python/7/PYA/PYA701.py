nums = tuple()
while True:
    n = eval(input())
    if n == -9999:
        break
    nums += (n,)

print(nums)
print(f"Length: {len(nums)}")
print(f"Max: {max(nums)}")
print(f"Min: {min(nums)}")
print(f"Sum: {sum(nums)}")