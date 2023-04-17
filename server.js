
const express = require('express'),
	app = express(),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	matchedFriends = require('./app/data/friends.json'),
	port = 2022


// Middleware that parses data to the api
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/app/public'))

// Routes the count on the home page of total matches
app.get('/count', (req, res) => {
	res.json(matchedFriends)
})

// Routes the survey from the home page giving it its path
app.get('/survey', (req, res) => {
	res.sendFile(path.join(__dirname + '/app/public/survey.html'))
})

// Sets route from the survey form
app.post('/api-people', (req, res) => {
	// Grabs the user scores obj from survey
	let user = req.body;
	let numScores = []
	user.scores.forEach(x => {  //Loops the scores and stores them on numScores
		numScores.push(Number(x))
	})
	user.scores = numScores

	// Set empty variables to hold the values of matched names
	let matchedResults = []; //Holds the matchedResults in an array
	let sorted; //Sorts the differences scores of user
	let matched; // Sets the final matched friend

	// Loop the matched friends and scores
	for (let mfScores of matchedFriends) {
		// console.log(mfScores)
		let reducer = (prev, current) => prev + current

		// Adds the previous number to the current num
		let totalDifference = [];
		// Logic of the difference between new and exsisting users
		for (let j = 0; j < 10; j++) {
			totalDifference.push(Math.abs(user.scores[j] - mfScores.scores[j]))
			mfScores.diff = totalDifference.reduce(reducer)
		}
		matchedResults.push(mfScores)
		sorted = matchedResults.sort((a, b) => a.diff - b.diff)
	}

	// Sets the final sorted scored matched friend
	matched = sorted[0]

	// Grabs the new user and sets data to friends.json
	fs.readFile('./app/data/friends.json', 'utf-8', (err, file) => {
		if (err) {
			console.log(err)
		} else {
			let storeUserArr = JSON.parse(file) //Pushes the file into the writeFile and stringyfies it
			storeUserArr.push(user)
			fs.writeFile('./app/data/friends.json', JSON.stringify(storeUserArr), (err, storeUserArr) => {
				// Catches the data to handle any errors
				try {
					const result = JSON.parse(undefined)
				} catch (err) {
					console.log("Success")
				}
				return file
			})
			console.log(storeUserArr)
		}
	})

	res.setHeader("Content-Type", "text/html; charset = UTF-8")

	// Sends matchedFriends data and renders it to the page
	res.send(`<!DOCTYPE html>
     <html>
        <body>
            <head>
             <title>Matched Friend</title>
         </head>
                <h2 class= "text-center text-info">You are matched up with: ${matched.name}</h2>
                <img class= "h-25 w-50 rounded mx-auto d-block " src="${matched.photo}" alt=""> <img>
       
         </body>
     </html>`)

})

// Sends an Error Page 
app.get('*', (req, res) => {
	res.send('<h1>Sorry! 404 Cannot find</h1>')
})
// Listening on Port 2022
app.listen(port, () => {
	console.log(`Server is runnning on http://localhost:${port}`)
})
