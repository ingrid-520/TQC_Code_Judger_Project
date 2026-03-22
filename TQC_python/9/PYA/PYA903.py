for i in range(5):
    name = input()
    with open("PYD903_data.txt", "a", encoding="utf-8") as f:
        f.write("\n" + name)
