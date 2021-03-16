/* globals feather, Chart */

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  name: 'DepositsChartBar',
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
      let docs = [...d]
      if (d.length > 30) {
        // docs = d.splice().split(d.length - 1 - 30, 30)
      }
      
      // console.log(docs)
      // let total = 0
      // const values = docs.reverse().map(doc => (total = total + doc.amount))
      const labels = docs.reverse().map(doc => (doc.name)).filter((value, index, self) => (self.indexOf(value) === index))
      const vals = []
      labels.forEach((name, index) => {
        const defaultAmount = 0
        vals[index] = docs.filter(doc => (doc.name === name)).map(doc => (doc.amount)).reduce((p, v) => {
          // console.log(p, v)
          return (p + v)
        }, defaultAmount)
      })
      this.$set(this, 'depositsChartValues', vals)
      this.$set(this, 'depositsChartLabels', labels)
      this.updateChart({
        duration: 800,
        easing: 'easeOutBounce'
      })
    }
  },
  async mounted() {

    const {
      Order
    } = this.$foundation.data
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
    const {
      Order
    } = this.$foundation.data
    Order.stopListenTo(this.onAddDocHandlerListener)
    Order.stopListenTo(this.onEditDocHandlerListener)
    Order.stopListenTo(this.onDeleteDocHandlerListener)
  },
  methods: {
    createChart() {
      const component = this
      const ctx = document.getElementById('myChartBar')
      // eslint-disable-next-line no-unused-vars
      if (this.myChartBar) {
        this.myChartBar.destroy()
      }
      this.myChartData = {
        type: 'horizontalBar',
        data: {
          labels: component.depositsChartLabels,
          datasets: [{
            data: component.depositsChartValues,
            lineTension: 1,
            backgroundColor: ['cyan', 'magenta']
          }]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return '$' + formatter.format(value)
                }
              }
            }]
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
      this.myChartBar = new Chart(ctx, this.myChartData)
    },
    updateChart() {
      this.myChartData.data.labels = this.depositsChartLabels
      this.myChartData.data.datasets[0].data = this.depositsChartValues
      this.myChartBar.update()
    },
    onAddDocHandler(eventObj) {
      const {
        error,
        data
      } = eventObj
      if (error) {
        return
      }
      this.documents.unshift(data)
    },
    onEditDocHandler(eventObj) {
      const {
        data
      } = eventObj
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id) {
          this.$set(this.documents, index, data)
        }
      });
    },
    onDeleteDocHandler(eventObj) {
      const {
        data
      } = eventObj
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id) {
          this.documents.splice(index, 1)
        }
      });
    }
  }
}