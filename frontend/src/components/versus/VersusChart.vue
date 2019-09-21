<script>
import { Doughnut } from 'vue-chartjs'
export default {
    name: "VersusChart",
    props: {
        data: Array,
        team1: String,
        team2: String,
    },
    extends: Doughnut,
    data() {
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            chartdata: {
                labels: ['Team 2', 'Draws', 'Team 1'],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: ['#1867C0', '#6D6D6D', '#f87979'],
                    data: this.data
                    }
                ]
            }
        }
    },
    mounted() {
        this.renderChart(this.chartdata, this.options)
    },
    methods: {
        createChartData() {
            var chartdata = {
                labels: ['January', 'February'],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20]
                    }
                ]
            }
            this.renderChart(chartdata, this.options)
        }
    }
}
</script>