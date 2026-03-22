f_name = input()
n = int(input())
#TODO
with open(f_name, "r") as f:
    content = f.read().replace("\n", " ").split(" ")
    words = sorted(set(content))
    for word in words:
        if n == content.count(word):
            print(word)