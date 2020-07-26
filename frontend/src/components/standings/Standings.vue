<template>
<div>a
    <span class="title font-light">Standings {{ snapshotDate ? new Date(snapshotDate).toLocaleDateString('fi-FI') : year}}</span>
    <v-data-table
        :headers="compactView ? compactHeaders : headers"
        :items="standings"
        :items-per-page="15"
        class="elevation-1"
    >
    <template v-slot:item.logo="{ item }">
        <img height="30" style="vertical-align:middle" v-if="$store.getters.logo(item.name, currentYear)" :src="$store.getters.logo(item.name, currentYear)">
    </template>
    <template v-slot:item.name="{ item }">
        <span style="margin-left: 3px">
            <router-link :to="{ name: 'team', params: { team: item.name }}">{{ item.name }}</router-link>
        </span>
        
    </template>
    </v-data-table>
</div>
</template>
<script>
import axios from "axios"

export default {
    name: "Standings",
    props: {
        compactView: Boolean,
        snapshotDate: String
    },
    data() {
        return {
            headers: [
                { text: '', value: 'logo', align: 'center', sortable: false},
                { text: 'Team', value: 'name', sortable: false},
                { text: 'Matches', value: 'matches'},
                { text: 'Wins', value: 'wins'},
                { text: 'Draws', value: 'draws'},
                { text: 'Losses', value: 'losses'},
                { text: 'GF', value: 'goalsFor'},
                { text: 'GA', value: 'goalsAgainst'},
                { text: 'Points', value: 'points'},
                ],
            compactHeaders: [
                { text: '', value: 'logo', align: 'center' , sortable: false},
                { text: 'Team', value: 'name', sortable: false},
                { text: 'Matches', value: 'matches'},
                { text: 'Points', value: 'points'},
            ],
            year: 2019,
            matches: []
        }
    },
    computed: {
        currentYear() {
            return this.snapshotDate ? this.snapshotDate.split("-")[0] : new Date().getFullYear()
        },
        standings() {
            var teams = {}
            this.matches.forEach(match => {
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
    },
    mounted() {
        this.getMatches()
    },
    methods: {
        getMatches() {
            if (this.snapshotDate) {
                axios.get("/matchesatmoment", {
                    params: {
                        year: this.snapshotDate.split("-")[0],
                        date: this.snapshotDate
                    }
                }).then(response => {
                    this.matches = response.data
                })
            } else {
                axios.get("/matchesinseason", {
                    params: {
                        year: this.year
                    }
                }).then(response => {
                    this.matches = response.data
                })
            }
            
        }
    }
}
</script>
<style scoped>
img {
  display: inline-block;
  max-width:30px;
  max-height:30px;
  width: auto;
  height: auto;
}
</style>