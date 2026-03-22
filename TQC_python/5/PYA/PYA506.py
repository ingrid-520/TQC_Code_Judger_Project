
a = eval(input())
b = eval(input())
c = eval(input())

def compute(a, b, c):
    check = b**2 - (4 * a * c)
    if check < 0:
        return "Your equation has no root."
    elif check == 0:
        return (-b/(2*a))
    else: 
        return f"{(-b+((check)**0.5))/(2*a)}, {(-b-((check)**0.5))/(2*a)}"

print(compute(a, b, c))