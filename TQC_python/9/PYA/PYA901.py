text = ""
with open("write.text", "w") as f:
    for i in range(5):
        name = input()
        score = input()
        text += (name + " " + score + "\n")
    f.write(text)


