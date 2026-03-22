nums = set()

while True:
    n = int(input())
    if n == -9999:
        break
    nums.add(n)

print(f"Length: {len(nums)}")
print(f"Max: {max(nums)}")
print(f"Min: {min(nums)}")
print(f"Sum: {sum(nums)}")