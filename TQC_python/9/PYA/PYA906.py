f_name = input()
str_old = input()
str_new = input()
#TODO

print("=== Before the replacement")
#TODO
with open(f_name, "r") as f:
    content = f.read()

print(content)

print("=== After the replacement")
content = content.replace(str_old, str_new)
print(content)
#TODO