const express = require('express')
const mysql = require('mysql')
const request = require('request')
const rp = require('request-promise')
const cheerio = require('cheerio');
const app = express()
const port = 3000

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
  })

const today = new Date()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))

var scrapeWebpage = function(year) {
    if (year >= 2015 && year < 2020) {
        rp('http://www.veikkausliiga.com/tilastot/' + year + '/veikkausliiga/ottelut/').then(function (body) {
                //2015 -->
                //3 - ajankohta
                //5 - alkamisajankohta
                //7 - joukkueet
                //11 - tulos
                //13 - yleisömäärä

                //<--2015

            //Scraping the matches from Veikkausliiga-history page
            var matches = cheerio('.games-list-table > tbody > tr', body)
            var amountOfMatches = cheerio('.games-list-table > tbody > tr', body).length
            var matchDate = ""
            for (var i = 0; i < amountOfMatches; i++) {
                var match = matches[i]
                if (match.children[3].children[0]) {
                    matchDate = match.children[3].children[0].data
                }
                var matchDateSplit = matchDate.split(" ")
                var formattedMatchDate = matchDateSplit[1].split(".")
                var day = formattedMatchDate[0]
                var month = formattedMatchDate[1]
                if (parseInt(formattedMatchDate[0]) < 10) {
                    day = "0" + formattedMatchDate[0]
                }
                if (parseInt(formattedMatchDate[1]) < 10) {
                    month = "0" + formattedMatchDate[1]
                }
                var readyDate = formattedMatchDate[2] + "-" + month + "-" + day
                var teams = match.children[7].children[0].children[0].data
                var splitTeams = teams.split(" - ")
                var score = match.children[11].children[0].data
                var splitScore = score.split(" — ")
                var attendance = match.children[13].children[0].data

                var matchObject = {weekday: matchDateSplit[0], date: readyDate, hometeam: splitTeams[0], awayteam: splitTeams[1], homegoals: splitScore[0], awaygoals: splitScore[1], attendance: attendance}
                console.log(matchObject)
                connection.query("INSERT INTO footballMatch (weekday, date, hometeam, awayteam, homegoals, awaygoals, attendance) VALUES (?,?,?,?,?,?,?)", [matchDateSplit[0], readyDate, splitTeams[0], splitTeams[1], splitScore[0], splitScore[1], attendance])
            }  
            scrapeWebpage(year+1)
        })
        .catch(e => {
            console.log(e)
        })
        

    } else if (year < 2015) {
        rp('http://www.veikkausliiga.com/tilastot/' + year + '/veikkausliiga/ottelut/').then(function (body) {

            //Scraping the matches from Veikkausliiga-history page
            var matches = cheerio('.games-list-table > tbody > tr', body)
            var amountOfMatches = matches.length
            console.log(year, amountOfMatches)

            var matchDate = ""
            for (var i = 0; i < amountOfMatches; i++) {

                var match = matches[i]
                if (match.children[3].children[0]) {
                    matchDate = match.children[3].children[0].data
                }
                var matchDateSplit = matchDate.split(" ")
                var formattedMatchDate = matchDateSplit[1].split(".")
                var day = formattedMatchDate[0]
                var month = formattedMatchDate[1]
                if (parseInt(formattedMatchDate[0]) < 10) {
                    day = "0" + formattedMatchDate[0]
                }
                if (parseInt(formattedMatchDate[1]) < 10) {
                    month = "0" + formattedMatchDate[1]
                }
                var readyDate = formattedMatchDate[2] + "-" + month + "-" + day
                var teams = match.children[5].children[0].children[0].data
                var splitTeams = teams.split(" - ")
                var score = match.children[9].children[0].data
                var splitScore = score.split(" — ")
                var attendance = match.children[11].children[0].data

                var matchObject = {weekday: matchDateSplit[0], date: readyDate, hometeam: splitTeams[0].trim(), awayteam: splitTeams[1].trim(), homegoals: splitScore[0], awaygoals: splitScore[1], attendance: attendance}
                console.log(matchObject)
                connection.query("INSERT INTO footballMatch (weekday, date, hometeam, awayteam, homegoals, awaygoals, attendance) VALUES (?,?,?,?,?,?,?)", [matchDateSplit[0], readyDate, splitTeams[0].trim(), splitTeams[1].trim(), splitScore[0], splitScore[1], attendance])
                
            }
            scrapeWebpage(year+1)
        })
        .catch(e => {
            console.log(e)
        })
    } else {
        console.log("recursion ended with year " + year)
    }
}

//Matches played in this date in required year

app.get('/matchestoday', function (req, res) {
    var today = new Date()
    var d = today.getDate()
    var m = today.getMonth() + 1

    connection.query('SELECT * FROM footballMatch WHERE DAY(date) = ? AND MONTH(date) = ?', [d, m], function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        res.send(rows)
    })
})

app.get('/matcheson', function (req, res) {
    var d = req.query.day
    var m = req.query.month
    var y = req.query.year

    connection.query('SELECT * FROM footballMatch WHERE DAY(date) = ? AND MONTH(date) = ? AND YEAR(date) = ?', [d, m, y], function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        res.send(rows)
    })
})

app.get('/matchesbetween', function (req, res) {

    connection.query('SELECT * FROM footballMatch WHERE ((hometeam = ? AND awayteam = ?) OR (hometeam = ? AND awayteam = ?)) ORDER BY date DESC', [req.query.team1, req.query.team2, req.query.team2, req.query.team1], function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        res.send(rows)
    })
})

app.get('/allmatches', function (req, res) {
    connection.connect()
    scrapeWebpage(1990)
    res.send("tehty!")
})

app.get('/attendanceAverages', function (req, res) {
    connection.query('SELECT DISTINCT f.hometeam, ( SELECT AVG(s.attendance) FROM footballMatch s WHERE f.hometeam = s.hometeam AND YEAR(s.date) = ?) avg_attendance FROM footballMatch f WHERE YEAR(f.date) = ? ORDER BY avg_attendance DESC', [req.query.year, req.query.year], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/seasonMatches', function (req, res) {
    console.log(req.query.year)
    connection.query('SELECT * FROM footballMatch WHERE (hometeam = ? OR awayteam = ?) AND year(date) = ? ORDER BY date ASC', [req.query.team, req.query.team, req.query.year], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})


//http://www.veikkausliiga.hs.prewise.com/ottelutilastot.asp?Koti=&pvm=1996&Submit1=Hae&haku=true

/*
SELECT DISTINCT f.hometeam, ( SELECT AVG(s.attendance) FROM footballMatch s WHERE f.hometeam = s.hometeam AND YEAR(s.date) = 2019) avg_attendance FROM footballMatch f WHERE YEAR(f.date) = 2019;
SELECT * FROM footballMatch WHERE ((hometeam = 'Ilves' AND awayteam = 'FC Honka') OR (hometeam = 'FC Honka' AND awayteam = 'Ilves'));
*/