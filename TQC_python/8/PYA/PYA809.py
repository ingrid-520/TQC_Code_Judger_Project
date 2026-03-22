password = input()

if len(password) < 8:
    print("Invalid password")
elif password.isalnum() == False:
    print("Invalid password")
elif password.islower() == True:
    print("Invalid password")
else:
    print("Valid password")
    



