/* globals feather, Chart */
import moment from 'moment'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  name: 'DepositsChart',
  props: {
    msg: String
  },
  data: () => ({
    depositsChartValues: [],
    depositsChartLabels: [],
    documents: []
  }),
  watch: {
    documents: function (d) {
      const docs = [...d]
      // // console.log(docs)
      let total = 0
      const values = docs.reverse().map(doc => (total = total + doc.amount))
      const labels = docs.reverse().map(doc => (moment(doc.date).format('LTS')))
      this.$set(this, 'depositsChartValues', values)
      this.$set(this, 'depositsChartLabels', labels)
      this.updateChart({
        duration: 800,
        easing: 'easeOutBounce'
      })
    }
  },
  async mounted() {
    
    const { Order } = this.$foundation.data
    feather.replace()
    this.createChart()

    this.onAddDocHandlerListener = Order.on('add', this.onAddDocHandler)
    this.onEditDocHandlerListener = Order.on('edit', this.onEditDocHandler)
    this.onDeleteDocHandlerListener = Order.on('delete', this.onDeleteDocHandler)

    const findOrders = await Order.findAll({})
    if (findOrders.error) {
      return
    }
    if (findOrders.data) {
      // console.log(findOrders.data)
      this.$set(this, 'documents', findOrders.data)
    }

  },
  beforeDestroy() {
    console.log('===============>>>>>>>>>>>>>>>')

    const { Order } = this.$foundation.data
    Order.stopListenTo(this.onAddDocHandlerListener)
    Order.stopListenTo(this.onEditDocHandlerListener)
    Order.stopListenTo(this.onDeleteDocHandlerListener)
  },
  methods: {
    createChart() {
      const component = this
      const ctx = document.getElementById('myChart')
      // eslint-disable-next-line no-unused-vars
      if (this.myChart) {
        this.myChart.destroy()
      }
      this.myChartData = {
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
                  beginAtZero: true,
                  callback: function(value) {
                    return '$' + formatter.format(value)
                  }
                }
              }
            ]
          },
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            mode: 'dataset'
          }
        }
      }
      this.myChart = new Chart(ctx, this.myChartData)
    },
    updateChart() {
      this.myChartData.data.labels = this.depositsChartLabels
      this.myChartData.data.datasets[0].data = this.depositsChartValues
      this.myChart.update()
    },
    onAddDocHandler (eventObj) {
      const { error,/* document, foundation, */data } = eventObj
      // console.log({ error, document, foundation, data })
      if (error) {
        return
      }
      this.documents.unshift(data)
    },
    onEditDocHandler (eventObj) {
      const { /* error, document, foundation, */data } = eventObj
      // console.log({ error, document, foundation, data })
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id){
          this.$set(this.documents, index, data)
        }
      });
    },
    onDeleteDocHandler (eventObj) {
      const { /* error, document, foundation,*/ data } = eventObj
      // console.log({ error, document, foundation, data })
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id){
          this.documents.splice(index, 1)
        }
      });
    }
  }
}
