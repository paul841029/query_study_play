import csv
import os
import random
for i in range(24):
	csvfile = open(str(i)+".csv","wb")
	spamwriter = csv.writer(csvfile, delimiter=',',quotechar=',', quoting=csv.QUOTE_MINIMAL)
	spamwriter.writerow(['x','y'])
	x = []
	y = []
	slope=[3,18,0,-3,-18,99]
	latest_y = 10
	seq_len = random.randint(4,8)

	for i in range(0,seq_len): 
		index = random.randint(0,5)
		if(slope[index]==99):
			x.append(i)
			y.append(0)
		else:
			x.append(i)
			y.append(latest_y+slope[index])
			latest_y = latest_y+slope[index]
	if min(y) < 0:
		_m = min(y)
		for j in range(len(y)):
			y[j] = -_m + y[j]		
	
	for k in range(len(y)):
		spamwriter.writerow([x[k],y[k]])
        
			 
		
