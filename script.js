"use strict";
/*This function sorts and returns an array with one of each unique value, ordered greatest to least number of occurrences.*/
function FindModes(array)
{
	let counter = [];
	//count individual occurrences of each element
	for(let elem in array)
	{
		if(!(array[elem] in counter))
			counter[array[elem]] = {number: array[elem], amount: 0};

		counter[array[elem]].amount++;
	}
	let sortedCounter = counter.sort((a, b) => b.amount - a.amount); //sort in descending order
	return sortedCounter.map(a => a.number);
}
/*Calculates distance in miles from given time in seconds.*/
function FindDistance(time) 
{
	return time * 0.00266667;
}
/*Calculates the average numerical value of an array.*/
function FindAverage(array) 
{
	let total = 0;
	//totals values and divides them by array length
	for(let elem of array) 
	{
		total += elem;
	}
	return total / array.length;
}

/*Initialize fields*/
//used for most popular stations
let startStations = [];
let stopStations = [];

let distances = []; //used for average distance

//used for trip category and passholder statuses
let oneWay = [0, 0, 0];
let roundTrip = [0, 0, 0];

let tripsByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //holds trips per month

//used for average ride time per season
let timeBySeason = [];
let avgWinter = [];
let avgSpring = [];
let avgSummer = [];
let avgFall = [];

//parses JSON
let xhr = new XMLHttpRequest();
xhr.open("GET", "data.json", true);
xhr.responseType = "json";
xhr.send();

/*OnLoad function. All calculations go in this function to ensure data is loaded before performing them.*/
xhr.onload = function()
{
		//loop through parsed data and sort
		for(let elem of xhr.response.results) 
		{
			//collect all stations
			startStations.push(elem["Starting Station ID"]);
			stopStations.push(elem["Ending Station ID"]);

			//collect all distances
			distances.push(FindDistance(elem["Duration"]));

			//determines trip category, then determines the passholder type and adds to respective value
			if(elem["Trip Route Category"] == "One Way")
				if(elem["Passholder Type"] == "Monthly Pass")
					oneWay[0]++;
				else if(elem["Passholder Type"] == "Flex Pass")
					oneWay[1]++;
				else 
					oneWay[2]++;
			else
				if(elem["Passholder Type"] == "Monthly Pass")
					roundTrip[0]++;
				else if(elem["Passholder Type"] == "Flex Pass")
					roundTrip[1]++;
				else 
					roundTrip[2]++;

			//determines month and adds to respective value
			let month = parseInt(elem["Start Time"].substr(5, 2));
			tripsByMonth[(month + 5) % 12]++; //data only exists for 9/12 months, so data is offset

			//sorts duration into its proper season
			if(month == 12 || month < 3) 
				avgWinter.push(elem["Duration"]);
			else if(month > 2 && month < 6)
				avgSpring.push(elem["Duration"]);
			else if(month > 5 && month < 9)
				avgSummer.push(elem["Duration"]);
			else
				avgFall.push(elem["Duration"]);
		}
	/*Create and display conclusions.*/

	let headers = document.querySelectorAll("h2");
	
	//find most popular stations and append them
	let topStartStations = FindModes(startStations);
	let topStopStations = FindModes(stopStations);
	headers[1].innerHTML = topStartStations[0] + ", " + topStartStations[1] + ", " + topStartStations[2];
	headers[2].innerHTML = topStopStations[0] + ", " + topStopStations[1] + ", " + topStopStations[2];

	//average distances and append them
	headers[3].innerHTML = FindAverage(distances).toFixed(2) + " miles";

	//append no. of users
	//If they have a pass, they are considered a regular user.
	headers[0].innerHTML = oneWay[0] + oneWay[1] + roundTrip[0] + roundTrip[1];

	//average times by season
	timeBySeason = [FindAverage(avgWinter), FindAverage(avgSpring), FindAverage(avgSummer), FindAverage(avgFall)];
	timeBySeason = timeBySeason.map(a => (a / 60).toFixed(2));  

	//displays chart for bike passes/trip category
	let BikePasses = new Chart(document.querySelector("#BikePasses"), 
	{
		type: 'bar',
		data: 
		{ 
			labels: ["Monthly Pass", "Flex Pass", "Walk-Up"], 
			datasets: 
			[{
 				label: "One Way",
				data: oneWay,
				backgroundColor: "#25a2a6"
			},
			{
				label: "Round Trip",
				data: roundTrip,
				backgroundColor: "#fddd62"
			}]
		},    
		options: 
		{
        		scales: 
			{
        			xAxes: [{ stacked: true }],
				yAxes: [{ stacked: true }]
        		}
		}
	});
	//displays chart for monthly number of trips
	let Monthly = new Chart(document.querySelector("#Monthly"), 
	{
		type: 'line',
		data: 
		{ 
			labels: ["July", "August", "September", "October", "November", "December", "January", "February", "March"], 
			datasets: 
			[{
				label: "Number of Trips",
				data: tripsByMonth,
				borderColor: "#a4d05f",
				backgroundColor: "rgba(164, 208, 95, 0.1)"
			}]
		},    
	});
	//displays chart for average ride time by season
	let Seasonal = new Chart(document.querySelector("#Seasonal"), 
	{
		type: 'line',
		data: 
		{ 
			labels: ["Winter", "Spring", "Summer", "Fall"], 
			datasets: 
			[{
				label: "Ride Length (In Minutes)",
				data: timeBySeason,
				borderColor: "#f48f97",
				backgroundColor: "rgba(244, 143, 151, 0.1)"
			}]
		},    
	});
}
