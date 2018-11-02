Author: Julianna Apicella

Description:
This web app analyzes bike share data for the city of Los Angeles.
The following data is analyzed:
- Most popular start/stop stations
- Average distance traveled
- Number of regular users
- Total instance of each type of bike pass, and their composition of trip categories
- Total number of trips per month
- Average trip length per season

Parsing:
The data is read into the app using an XMLHttpRequest. Only the necessary data categories were converted to JSON to conserve space.

Web App:
This app is compatible with recent versions of Chrome, Edge, Firefox, and Safari, on desktop and on mobile.
Loading may take a moment or two, depending on your connection, due to the large amount of data needing to be parsed and analyzed.

Most Popular Start/Stop Stations:
To calculate the top stop/start stations, each instance of a station was collected and passed through a method to order them from most to least popular.
The top three are displayed.

Average Distance Traveled:
No data for the distance of each trip was provided, so the ride time (in seconds) was collected, and converted to miles using the average speed of a bike.
Lat/long could have been analyzed instead, but this would not account for round trips (who have the same start/stop lat/long), or the path the rider took between the two points.
Once converted, the data is averaged.

Number of Regular Users:
"Regular" users could mean many things, but I interpreted it as those who have passes.
The number was totaled and displayed.

Bike Passes:
The first chart is a bar graph displaying the total number of each instance of a bike pass and their composition of trip categories.
The values were sorted and graphed using the Chart.js API.

Trips Per Month:
The second chart is a line graph showing the total number of trips per month.
Data is provided for only 9 of the 12 months, so the graph is offset to accomodate for this.
The values were sorted and graphed using the Chart.js API.

Length Per Season:
The third graph is a line graph showing the variance in average ride time per season.
The values were sorted, averaged, converted to minutes for easier reading, and then graphed using the Chart.js API.

Known Errors/Bugs:
There is an issue with position: sticky as applied to the navigation bar. Randomly on load, it will cause minor visual distortions and slow down the page. 
No particular cause has been determined, but it appears harmless.