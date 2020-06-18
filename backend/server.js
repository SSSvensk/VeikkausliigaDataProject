const express = require('express')
const mysql = require('mysql')
const rp = require('request-promise')
const cheerio = require('cheerio');
const app = express()
const port = 3000
const configFile = require('./config/config.js')
const matchContoller = require('./controllers/matchController.js')

var connection = mysql.createConnection(configFile)

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
                var hrefSplit = match.children[7].children[0].attribs.href.split("/")
                var matchId = parseInt(hrefSplit[hrefSplit.length - 2])
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

                connection.query("INSERT INTO footballMatch (id, weekday, date, hometeam, awayteam, homegoals, awaygoals, attendance) VALUES (?,?,?,?,?,?,?,?)", [matchId, matchDateSplit[0], readyDate, splitTeams[0], splitTeams[1], splitScore[0], splitScore[1], attendance])
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

                const match = matches[i]
                if (match.children[3].children[0]) {
                    matchDate = match.children[3].children[0].data
                }
                var hrefSplit = match.children[5].children[0].attribs.href.split("/")
                var matchId = parseInt(hrefSplit[hrefSplit.length - 2])
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
                connection.query("INSERT INTO footballMatch (id, weekday, date, hometeam, awayteam, homegoals, awaygoals, attendance) VALUES (?,?,?,?,?,?,?,?)", [matchId, matchDateSplit[0], readyDate, splitTeams[0].trim(), splitTeams[1].trim(), splitScore[0], splitScore[1], attendance])
                
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

app.get('/match', function (req, res) {
    const year = req.query.year
    const matchId = req.query.id
    rp('http://www.veikkausliiga.com/tilastot/' + year + '/veikkausliiga/ottelut/' + matchId + '/seuranta/').then(function (body) {
        //game-report
        //first child = tr
        /* events: {
            home
            time
            away
        } */
        var matchReportFound = false
        var matchReport = cheerio('.game-report', body)
        console.log(matchReport[0].children)
        res.send(matchReport[0].children)
    })
    .catch(e => {
        console.log(e)
    })
})

app.get('/matchbasicdata', function (req, res) {
    connection.query('SELECT * FROM footballMatch WHERE id=?', [req.query.id], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/matchesbyteam', function (req, res) {
    connection.query('SELECT * FROM footballMatch WHERE hometeam=? OR awayteam=? ORDER BY date DESC', [req.query.team, req.query.team], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/matchestoday', function (req, res) {
    var today = new Date()
    var d = today.getDate()
    var m = today.getMonth() + 1

    connection.query('SELECT * FROM footballMatch WHERE DAY(date) = ? AND MONTH(date) = ?', [d, m], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/matchesinseason', function (req, res) {
    const year = req.query.year
    connection.query('select * from footballMatch WHERE YEAR(date) = ? ORDER BY date ASC', [year], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/matchesatmoment', function (req, res) {
    console.log(req.query.date)
    connection.query('select * from footballMatch WHERE YEAR(date) = ? AND date <= ? ORDER BY date ASC', [req.query.year, req.query.date], function (err, rows, fields) {
        if (err) throw err
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

app.get('/fewestgoalsonmatchday', function (req, res) {
    connection.query('select date, sum(homegoals + awaygoals) as goals, count(*) as matches from footballMatch group by date HAVING matches > 3 ORDER BY goals ASC LIMIT 10;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/mostgoalsonmatchday', function (req, res) {
    connection.query('select date, sum(homegoals + awaygoals) as goals from footballMatch group by date ORDER BY goals DESC LIMIT 10;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/biggestwins', function (req, res) {
    connection.query('select * from footballMatch order by greatest(homegoals, awaygoals) - least(homegoals, awaygoals) DESC limit 20;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/matchesbetween', function (req, res) {

    connection.query('SELECT * FROM footballMatch WHERE ((hometeam = ? AND awayteam = ?) OR (hometeam = ? AND awayteam = ?)) ORDER BY date DESC', [req.query.team1, req.query.team2, req.query.team2, req.query.team1], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.get('/getallmatches', function (req, res) {
    connection.connect()
    scrapeWebpage(1990)
    res.send("tehty!")
})

app.get('/attendanceAverages', function (req, res) {
    connection.query('SELECT hometeam, avg(attendance) as avg_attendance from footballMatch where year(date) = ? group by hometeam ORDER BY avg_attendance DESC', [req.query.year], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/alltimeattendanceaverages', function (req, res) {
    connection.query('SELECT DISTINCT f.hometeam, ( SELECT AVG(s.attendance) FROM footballMatch s WHERE f.hometeam = s.hometeam) avg_attendance FROM footballMatch f ORDER BY avg_attendance DESC;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/highestAttendances', function (req, res) {
    var limitResults = 0
    connection.query('SELECT * FROM footballMatch ORDER By attendance DESC LIMIT 50', [limitResults], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/highestaverageattendances', function (req, res) {
    connection.query('select YEAR(date) AS year, hometeam, AVG(attendance) as average FROM footballMatch group by YEAR(date), hometeam ORDER BY average DESC LIMIT 20;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/bestdailyattendances', function (req, res) {
    connection.query('select date, count(*) as ct, avg(attendance) as average from footballMatch group by date HAVING ct > 3 ORDER BY average DESC LIMIT 10;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/worstdailyattendances', function (req, res) {
    connection.query('select date, count(*) as ct, avg(attendance) as average from footballMatch group by date HAVING ct > 3 ORDER BY average ASC LIMIT 10;', function (err, rows, fields) {
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

app.get('/seasonsinveikkausliiga', function (req, res) {
    connection.query('SELECT COUNT(DISTINCT YEAR(date)) FROM footballMatch WHERE hometeam = ?', [req.query.team], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/allmatches', function (req, res) {
    connection.query('SELECT * FROM footballMatch ORDER BY date ASC', [req.query.team], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})




//http://www.veikkausliiga.hs.prewise.com/ottelutilastot.asp?Koti=&pvm=1996&Submit1=Hae&haku=true

/*
SELECT DISTINCT f.hometeam, ( SELECT AVG(s.attendance) FROM footballMatch s WHERE f.hometeam = s.hometeam AND YEAR(s.date) = 2019) avg_attendance FROM footballMatch f WHERE YEAR(f.date) = 2019;
SELECT * FROM footballMatch WHERE ((hometeam = 'Ilves' AND awayteam = 'FC Honka') OR (hometeam = 'FC Honka' AND awayteam = 'Ilves'));
*/