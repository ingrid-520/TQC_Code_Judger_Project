candidate_1 = 0
candidate_2 = 0
invalid = 0

for i in range(5):
    vote = eval(input())
    if vote == 1:
        candidate_1 += 1
    elif vote == 2:
        candidate_2 += 1
    else:
        invalid += 1
    print(f"Total votes of No.1: Nami =  {candidate_1}")
    print(f"Total votes of No.2: Chopper =  {candidate_2}")
    print(f"Total null votes =  {invalid}")

if candidate_1 > candidate_2:
    print("=> No.1 Nami won the election.")
elif candidate_1 < candidate_2:
    print("=> No.2 Chopper won the election.")
else:
    print("=> No one won the election.")


