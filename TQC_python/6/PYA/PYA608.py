# TODO


nums = [eval(input()) for i in range(9)]

big = nums.index(max(nums))
small = nums.index(min(nums))

big_row = big // 3
big_col = big % 3

small_row = small // 3
small_col = small % 3

print(f"Index of the largest number {max(nums)} is: ({big_row}, {big_col})")
print(f"Index of the smallest number {min(nums)} is: ({small_row}, {small_col})")
