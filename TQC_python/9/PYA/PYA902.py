with open("PYD902_read.txt", "r", encoding="utf-8") as f:
    str_data = f.read()

data = list(map(int, str_data.split(" ")))
print(sum(data))
    