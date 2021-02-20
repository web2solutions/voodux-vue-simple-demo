/* globals feather, Chart */
export default {
  name: 'DepositsChart',
  props: {
    msg: String
  },
  data: () => ({
    depositsChartValues: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
    depositsChartLabels: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  }),
  mounted () {
    const component = this
    feather.replace()
    // Graphs
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-unused-vars
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: component.depositsChartLabels,
        datasets: [
          {
            data: component.depositsChartValues,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    })
  },
  beforeUnmount () {
    
  },
  methods: {}
}
