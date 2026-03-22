# TODO

set_1 = set()
set_2 = set()
set_3 = set()

for i in range(5):
    n = int(input())
    set_1.add(n)

for i in range(3):
    n = int(input())
    set_2.add(n)

for i in range(9):
    n = int(input())
    set_3.add(n)

print(f"Input to set1: {set_1}")
print(f"Input to set2: {set_2}")
print(f"Input to set3: {set_3}")
print(f'set2 is subset of set1: {set_2.issubset(set_1)}')
print(f'set3 is superset of set1: {set_3.issuperset(set_1)}')

# TODO

