sentence = input()
letter = input()

def compute(sentence, letter):
    return f"{letter} occurs {sentence.count(letter)} time(s)"

print(compute(sentence, letter))