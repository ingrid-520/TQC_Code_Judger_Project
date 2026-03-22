n = eval(input())
for i in range(n):
    answer = 0
    string = input()
    for j in range(0, len(string)):
        answer += int(string[j])
    print(f"Sum of all digits of {string} is {answer}")