const standingsMixin = {
    methods: {
        getStandings(matchList) {
            var teams = {}
            matchList.forEach(match => {
                if (new Date(match.date) < Date.now()) {
                const result = match.awaygoals > match.homegoals ? "awayWin" : match.awaygoals == match.homegoals ? "draw" : "homeWin"
                const homeTeam = match.hometeam.trim()
                const awayTeam = match.awayteam.trim()
                var awayStats = {
                    points: result == "awayWin" ? 3 : result == "draw" ? 1 : 0,
                    goalsFor: match.awaygoals,
                    goalsAgainst: match.homegoals,
                    wins: result == "awayWin" ? 1 : 0,
                    draws: result == "draw" ? 1 : 0,
                    losses: result == "homeWin" ? 1 : 0
                }
                var homeStats = {
                    points: result == "homeWin" ? 3 : result == "draw" ? 1 : 0,
                    goalsFor: match.homegoals,
                    goalsAgainst: match.awaygoals,
                    wins: result == "homeWin" ? 1 : 0,
                    draws: result == "draw" ? 1 : 0,
                    losses: result == "awayWin" ? 1 : 0
                }


                if (teams[homeTeam]) {
                    teams[homeTeam] = {
                        name: homeTeam,
                        matches: teams[homeTeam]["matches"] + 1,
                        points: teams[homeTeam]["points"] + homeStats.points,
                        goalsFor: teams[homeTeam]["goalsFor"] + homeStats.goalsFor,
                        goalsAgainst: teams[homeTeam]["goalsAgainst"] + homeStats.goalsAgainst,
                        wins: teams[homeTeam]["wins"] + homeStats.wins,
                        draws: teams[homeTeam]["draws"] + homeStats.draws,
                        losses: teams[homeTeam]["losses"] + homeStats.losses
                    }
                } else {
                    teams[homeTeam] = {
                        name: homeTeam,
                        matches: 1,
                        points: homeStats.points,
                        goalsFor: homeStats.goalsFor,
                        goalsAgainst: homeStats.goalsAgainst,
                        wins: homeStats.wins,
                        draws: homeStats.draws,
                        losses: homeStats.losses
                    }
                }
                if (teams[awayTeam]) {
                    teams[awayTeam] = {
                        name: awayTeam,
                        matches: teams[awayTeam]["matches"] + 1,
                        points: teams[awayTeam]["points"] + awayStats.points,
                        goalsFor: teams[awayTeam]["goalsFor"] + awayStats.goalsFor,
                        goalsAgainst: teams[awayTeam]["goalsAgainst"] + awayStats.goalsAgainst,
                        wins: teams[awayTeam]["wins"] + awayStats.wins,
                        draws: teams[awayTeam]["draws"] + awayStats.draws,
                        losses: teams[awayTeam]["losses"] + awayStats.losses
                    }
                } else {
                    teams[awayTeam] = {
                        name: awayTeam,
                        matches: 1,
                        points: awayStats.points,
                        goalsFor: awayStats.goalsFor,
                        goalsAgainst: awayStats.goalsAgainst,
                        wins: awayStats.wins,
                        draws: awayStats.draws,
                        losses: awayStats.losses
                    }
                }
                }
            });
            var sortable = []
            for (var team in teams) {
                sortable.push(teams[team]);
            }
            sortable.sort((a, b) => (a.points > b.points) ? -1 : ((b.points > a.points) ? 1 : 0 ))
            return sortable
        }
    }
}

export default standingsMixin