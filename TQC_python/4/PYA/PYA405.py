# TODO

while True:
    score = eval(input())
    if score == -9999:
        break
    else:
        if score <= 59:
            print("E")
        elif score <= 69:
            print("D")
        elif score <= 79:
            print("C")
        elif score <= 89:
            print("B")
        else:
            print("A")
        