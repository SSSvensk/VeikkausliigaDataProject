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

var scrapeWebpage = function(year, continuous = true) {
    if (year >= 2015 && year < 2021) {
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
            if (continuous) {
                scrapeWebpage(year+1, true)
            } else {
                scrapeWebpage(year+1, false)
            }
            
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
            if (continuous) {
                scrapeWebpage(year+1, true)
            } else {
                scrapeWebpage(year+1, false)
            }
        })
        .catch(e => {
            console.log(e)
        })
    } else {
        console.log("recursion ended with year " + year)
    }
}

app.get('/teams', function (req, res) {
    connection.query('SELECT DISTINCT hometeam AS name FROM footballMatch ORDER BY hometeam ASC', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

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
        res.send(rows)
    })
})

app.get('/leastgoalsonmatchday', function (req, res) {
    connection.query('select date, sum(homegoals + awaygoals) as goals, count(*) as matches from footballMatch group by date HAVING matches > 3 and goals IS NOT NULL ORDER BY goals ASC LIMIT 50;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/mostgoalsonmatchday', function (req, res) {
    connection.query('select date, sum(homegoals + awaygoals) as goals, count(*) as matches from footballMatch group by date ORDER BY goals DESC LIMIT 50;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/most-goals-match', function (req, res) {
    connection.query('select * from footballMatch order by homegoals+awaygoals DESC limit 50;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/biggest-wins', function (req, res) {
    connection.query('select * from footballMatch order by greatest(homegoals, awaygoals) - least(homegoals, awaygoals) DESC limit 50;', function (err, rows, fields) {
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

app.get('/bestmatches', function (req, res) {
    connection.query('select hometeam, awayteam, avg(attendance) as average, count(*) as matches from footballmatch where date < NOW() group by hometeam, awayteam having matches > 4 and average > 3000 ORDER by average DESC;', function (err, rows, fields) {
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

app.get('/last-matches', function (req, res) {
    connection.query('SELECT * from footballmatch where date <= NOW() ORDER BY date DESC LIMIT 50;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/next-matches', function (req, res) {
    connection.query('SELECT * from footballmatch where date > NOW() ORDER BY date ASC LIMIT 12;', [req.query.team, req.query.team, req.query.year], function (err, rows, fields) {
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

app.get('/getallmatches', function (req, res) {
    connection.connect()
    scrapeWebpage(1990, true)
    res.send("tehty!")
})

app.get('/updateseasonmatches', function (req, res) {
    //connection.connect()
    scrapeWebpage(parseInt(req.query.year), false)
    res.send("tehty!")
})

//Attendance average by team in specific season
app.get('/attendance-averages-by-season', function (req, res) {
    var sqlQuery = ""
    if (req.query.team) {
        sqlQuery = "select YEAR(date) as season, ROUND(AVG(attendance)) AS average from footballMatch WHERE hometeam = '" + req.query.team + "' group by year(date);"
    } else {
        sqlQuery = "select YEAR(date) as season, ROUND(AVG(attendance)) AS average from footballMatch group by year(date);"
    }
    connection.query(sqlQuery, function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

//Attendance average by team in specific season
app.get('/attendanceAverages', function (req, res) {
    connection.query('SELECT hometeam, avg(attendance) as avg_attendance from footballMatch where year(date) = ? group by hometeam ORDER BY avg_attendance DESC', [req.query.year], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

//Average attendance by team in all time
app.get('/alltime-attendance-averages', function (req, res) {
    connection.query('select hometeam, ROUND(avg(attendance)) as average from footballMatch where date < NOW() group by hometeam order by average DESC;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/highestattendancebyclub', function (req, res) {
    connection.query('SELECT * FROM footballMatch a INNER JOIN ( SELECT hometeam, MAX(attendance) attendance FROM footballMatch GROUP BY hometeam ) b ON a.hometeam = b.hometeam AND a.attendance = b.attendance GROUP by a.hometeam ORDER by a.attendance DESC;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/worstattendancebyclub', function (req, res) {
    connection.query('SELECT * FROM footballMatch a INNER JOIN ( SELECT hometeam, MIN(attendance) attendance FROM footballMatch WHERE attendance > 0 GROUP BY hometeam ) b ON a.hometeam = b.hometeam AND a.attendance = b.attendance GROUP by a.hometeam ORDER by a.attendance ASC;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/highestAttendances', function (req, res) {
    var sqlQuery
    if (req.query.team) {
        sqlQuery = "SELECT * FROM footballMatch WHERE hometeam = '" + req.query.team + "' ORDER By attendance DESC LIMIT 50"
    } else {
        sqlQuery = "SELECT * FROM footballMatch ORDER By attendance DESC LIMIT 50;"
    }
    connection.query(sqlQuery, [req.query.team], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/lowestAttendances', function (req, res) {
    var limitResults = 0
    connection.query('SELECT * FROM footballMatch WHERE attendance > 0 ORDER By attendance ASC LIMIT 50', [limitResults], function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/highestaverageattendances', function (req, res) {
    connection.query('select YEAR(date) AS year, hometeam, ROUND(AVG(attendance)) as average FROM footballMatch group by YEAR(date), hometeam ORDER BY average DESC LIMIT 50;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/bestdailyattendances', function (req, res) {
    connection.query('select date, count(*) as matches, ROUND(avg(attendance)) as average from footballMatch group by date HAVING matches > 3 ORDER BY average DESC LIMIT 50;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})

app.get('/worstdailyattendances', function (req, res) {
    connection.query('select date, count(*) as matches, ROUND(avg(attendance)) as average from footballMatch group by date HAVING matches > 3 ORDER BY average ASC LIMIT 10;', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
      })
})






//http://www.veikkausliiga.hs.prewise.com/ottelutilastot.asp?Koti=&pvm=1996&Submit1=Hae&haku=true

/*
SELECT DISTINCT f.hometeam, ( SELECT AVG(s.attendance) FROM footballMatch s WHERE f.hometeam = s.hometeam AND YEAR(s.date) = 2019) avg_attendance FROM footballMatch f WHERE YEAR(f.date) = 2019;
SELECT * FROM footballMatch WHERE ((hometeam = 'Ilves' AND awayteam = 'FC Honka') OR (hometeam = 'FC Honka' AND awayteam = 'Ilves'));
*/

//90, 93, 96, 99, 02, 19