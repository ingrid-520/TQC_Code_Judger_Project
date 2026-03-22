# TODO

a = eval(input())
b = eval(input())

count = 0
answer = []
for i in range(a, b + 1):
    if i % 4 == 0 or i % 9 == 0:
        print(f"{i:<4}" , end= "")
        answer.append(i)
        count += 1
        if count % 10 == 0:
            print("")

print() # 換行
print(len(answer))
print(sum(answer))