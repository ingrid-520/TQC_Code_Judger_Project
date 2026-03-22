while True:
    cm = eval(input())
    if cm == -9999:
        break
    else:
        kg = eval(input())
        bmi = kg / ((cm/100)**2)
        if bmi < 18.5:
            state = "under weight"
        elif bmi < 25:
            state = "normal"
        elif bmi < 30:
            state = "over weight"
        else:
            state = "fat"
        print(f"BMI: {bmi:.2f}")
        print(f"State: {state}")