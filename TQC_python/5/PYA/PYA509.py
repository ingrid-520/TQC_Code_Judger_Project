# TODO

import math
x, y = eval(input())
m, n = eval(input())
p = x*n + m*y
q = y*n

def compute(p, q):
    divid = math.gcd(p, q)
    p_new = p/divid
    q_new = q/divid
    return f"{x}/{y} + {m}/{n} = {int(p_new)}/{int(q_new)}"

print(compute(p, q))