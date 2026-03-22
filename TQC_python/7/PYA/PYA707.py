# TODO
x = set()
y = set()

print("Enter group X's subjects:")
while True:
    course = input()
    if course == "end":
        break
    x.add(course)
print(x)

print("Enter group Y's subjects:")
while True:
    course = input()
    if course == "end":
        break
    y.add(course)
print(y)

print(f"X組和Y組的所有科目: {x.union(y)}")
print(f"X組和Y組的共同科目: {x.intersection(y)}")
print(f"Y組有但X組沒有的科目: {y.difference(x)}")
print(f"X組和Y組彼此沒有的科目（不包含相同科目）: {x.symmetric_difference(y)}")
# TODO