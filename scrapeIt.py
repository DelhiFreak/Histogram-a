import requests
from bs4 import BeautifulSoup
import sys

query = sys.argv[1]
sy = int(sys.argv[2])
ey = int(sys.argv[3])

for y in range(sy, ey+1):
	url = 'https://europepmc.org/search?query='+query+'+AND+FIRST_PDATE:%5B'+str(y)+'+TO+'+str(y)+'%5D&page=1&sortby=Times%2BCited%2BDESC'
	page = requests.get(url).content

	soup = BeautifulSoup(page, 'html.parser')

	results = soup.text.split('1 - 25 of ')[1].split('results')[0].strip()
	paper = soup.text.split('Select results 1 - 25')[1].split('.')[0].strip()
	cited = soup.text.split('Cited: ')[1].split('times')[0].strip()

	print(results +'>' + paper +'>'+ cited +'\n')
