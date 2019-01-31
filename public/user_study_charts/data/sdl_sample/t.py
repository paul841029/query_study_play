import csv
import random
import numpy as np
import copy

def write_to_file(data_list):
	result = ""
	if data_list[0] == 0:
		result += "/zero"
	for i in range(1,len(data_list)):
		slope = data_list[i] - data_list[i-1]
		if data_list[i-1]==0 and data_list[i] != 0:
			result += "/appear"
		elif data_list[i-1]!=0 and data_list[i] == 0:
			result += "/disappear"
		else:
			if slope == 3:
				result += "/up"
			if slope == 18:
				result += "/Up"
			if slope == 0:
				result += "/stable"
			if slope == -3:
				result += "/down"
			if slope == -18:
				result += "/Down"
	result += "\n"		
	return result[1:]			
def main():
	f = open("patterns_0525_1.txt","w")
	for i in range(36,39):
		csvfile = open(str(i)+".csv","wb")
		spamwriter = csv.writer(csvfile, delimiter=',',quotechar=',', quoting=csv.QUOTE_MINIMAL)
		spamwriter.writerow(['x','y'])
		x = []
		y = []
		slope=[3,18,0,-3,-18,99]
		latest_y = 0
		seq_len = random.randint(12,21)

		for s in range(0,seq_len): 
			index = random.randint(0,5)
			if(slope[index]==99):
				x.append(s)
				y.append(0)
				latest_y = 0
			else:
				x.append(s)
				y.append(latest_y+slope[index])
				latest_y = latest_y+slope[index]
		if min(y) < 0:
			_m = min(y)
			for j in range(len(y)):
				y[j] = -_m + y[j]		
		f.write(str(i)+"	"+write_to_file(y))
		for k in range(len(y)):
			spamwriter.writerow([x[k],y[k]])
		print i,
		print y

y1 = np.zeros(50).tolist()
y2 = (np.array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])+10).tolist()
point_map = [{'x':range(len(y1)), 'y':y1}, {'x':range(len(y2)), 'y':y2}]        
def tmp():
	for i in range(0,3):
		csvfile = open('../20/'+str(i)+".csv","wb")
		spamwriter = csv.writer(csvfile, delimiter=',',quotechar=',', quoting=csv.QUOTE_MINIMAL)
		spamwriter.writerow(['x','y'])
		
		length = random.sample([1,2],1)
		print(length)
		indicies = random.sample(range(3,40,2), length[0])
		yy = copy.deepcopy(y1)
		for i in indicies:
			yy[i] = 10
		x = range(len(yy))	
		
		for k in range(len(yy)):
			spamwriter.writerow([x[k],yy[k]])
		csvfile.close()
tmp()		
#Up,up,Down,down,appear,disapear,zero