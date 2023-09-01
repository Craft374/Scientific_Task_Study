A =[1,2,36,123]
B =[13,26,24,5]

if len(A) < len(B):
    P = len(A)
else:
    P = len(B)

for i in range(0, P):
    for e in range(-10, 11):
        if 12*e+A[i] == B[i]:
            print("C",end='')
        else:
            print("X",end='')
    print("")