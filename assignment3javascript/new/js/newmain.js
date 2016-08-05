const readline = require('readline');
const fs = require('fs');
const stream = require('stream');


var arrObj =[];
var arrObj1 =[];
var header=[];

// output= fs.WriteStream('Data1.json');
// output1= fs.WriteStream('Data2.json');



const rl = readline.createInterface({

	input: fs.createReadStream('../includes/India2011.csv'),
  // terminal : false

});

var flag=0;
var header=[];
var ageGroup,total,literatePersons;


rl.on('line',function(line)
{

if(flag==0)
{
	header=line.trim().split(',');
  	Agegroup = header.indexOf("Age-group");
	total = header.indexOf("Total/Rural/Urban");
	literatePersons = header.indexOf("Literate - Persons");
	console.log(Agegroup);

  	flag=1;
}
else
{
	var obj={};
	var lineeach=line.split(',');
	var sumage=0;
	
	var agearr=lineeach[Agegroup];
	if(lineeach[Agegroup]!="All ages"&&lineeach[total]=="Total")
	{
		
			
			sumage = sumage+ parseInt(lineeach[literatePersons]);

			obj[lineeach[Agegroup]]=sumage;
			
	}
	//console.log(sumage);

	flag++;
}
});