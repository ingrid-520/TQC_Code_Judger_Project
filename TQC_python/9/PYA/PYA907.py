f_name = "PYD907_read.txt"
count_line = 0
count_word = 0
count_char = 0
#TODO


with open(f_name, "r") as f:
    for line in f:
        count_line += 1
        count_word += len(line.split(" "))
        count_char += len(line.replace(" ", "").replace('\n', ''))
print(f'{count_line} line(s)')
print(f'{count_word} word(s)')
print(f'{count_char} character(s)')