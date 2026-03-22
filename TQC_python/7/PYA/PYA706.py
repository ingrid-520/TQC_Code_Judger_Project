k = int(input())

for i in range(k):
    sentence = input()
    check = set(sentence.lower().replace(" ", ""))
    if len(check) < 26:
        print("False")
    else:
        print("True")