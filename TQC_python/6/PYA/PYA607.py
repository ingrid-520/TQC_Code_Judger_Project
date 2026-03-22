student_score = {}

for i in range(1, 4):
    student_score[str(i)] = [eval(input()) for j in range(5)]
for score in range(1, 4):
    print(f"Student {score}")
    print(f"#Sum {sum(student_score[str(score)])}")
    average = sum(student_score[str(score)])/len(student_score[str(score)])
    print(f"#Average {average:.2f}")