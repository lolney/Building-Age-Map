import json, csv

def index(citylots): 
	dic = {}
	for row in propinfo:
		dic[row["Block and Lot Number"]] = row
	return dic

with open("CityLots.geojson") as fp1, open("Historic_Secured_Property_Tax_Rolls.csv") as fp2, open("joinedLots.geojson", 'w') as out:
	citylots = json.load(fp1)
	propinfo = csv.DictReader(fp2)

	print "Done reading"

	propinfoindexed = index(propinfo)

	print "Done indexing"

	notfound = 0

	for feature in citylots["features"]:
		props = feature["properties"]
		blocklotnum = props["mapblklot"]
		try:
			pi = propinfoindexed[blocklotnum]
			#for column in propinfo.fieldnames:
			props["Year Property Built"] = pi["Year Property Built"]
		except KeyError:
			notfound = notfound + 1
		
	pctnotfound = notfound / float(len(citylots["features"]))
	print "Pct of lots in CityLots not found in Prop Info: "
	print pctnotfound

	json.dump(citylots, out)

