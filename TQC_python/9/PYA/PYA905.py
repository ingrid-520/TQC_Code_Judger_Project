f_name = input()
str = input()
#TODO

print("=== Before the deletion")
#TODO
with open(f_name, "r") as f:
    content = f.read()

print(content)

print("=== After the deletion")
content = content.replace(str, "")
with open(f_name, "w") as f:
    f.write(content)
print(content)
#TODO