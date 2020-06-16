<script>
import { Line } from 'vue-chartjs'
export default {
    name: "VersusChart",
    props: {
        positions: Array,
        teams: Array,
        labels: Array
    },
    extends: Line,
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 20,
                            min: 1,
                            reverse: true
                        }
                    }]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            },
            chartdata: {
                labels: this.labels,
                datasets: [
                    {
                    label: 'Position',
                    fill: false,
                    borderColor: '#1867C0',
                    data: this.positions
                    },
                    {
                    label: 'Amount of teams',
                    steppedLine: 'after',
                    fill: false,
                    borderColor: 'black',
                    data: this.teams
                    }
                ]
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    }
}
</script>