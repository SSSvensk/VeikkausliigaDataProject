<script>
import { Line } from 'vue-chartjs'
export default {
    name: "VersusChart",
    props: {
        attendances: Array,
        dates: Array
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
                max: 10000,
                min: 0,
            }
        }]
    }
            },
            chartdata: {
                labels: this.dates,
                datasets: [
                    {
                    label: 'Kehitys',
                    fill: false,
                    borderColor: '#1867C0',
                    data: this.attendances
                    }
                ]
            }
        }
    },
    mounted() {
        console.log(this.attendances)
        console.log(this.dates)
        this.renderChart(this.chartdata, this.options)
    }
}
</script>