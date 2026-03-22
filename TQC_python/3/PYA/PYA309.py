#TODO

saving = eval(input())
rate = eval(input())
month = eval(input())


print('%s \t  %s' % ('Month', 'Amount'))
for i in range(1, month+1):
    saving = saving + saving*((rate/100)/12)
    print('%3d \t %.2f' % (i, saving))
