while True:
    leapyear = eval(input())
    if leapyear == -9999:
        break
    else:
        if (leapyear % 4 == 0 and leapyear % 100 != 0) or (leapyear % 400 == 0):
            print(f"{leapyear} is a leap year.")
        else:
            print(f"{leapyear} is not a leap year.")