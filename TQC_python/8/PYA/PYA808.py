


ssn = input()

if len(ssn) != 11:
    print("Invalid")
elif ssn[3] and ssn[6] != "-":
    print("Invalid")
elif ssn.replace("-", "").isdigit() == False:
    print("Invalid")
else:
    print("Valid")


