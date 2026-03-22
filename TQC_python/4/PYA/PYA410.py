n = eval(input())
space = " "
star = "*"
star_number = 1
for i in range(n):
    print(space*(n-1-i) + star*star_number)
    star_number += 2