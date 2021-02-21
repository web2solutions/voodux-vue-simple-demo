/* globals feather, Chart */
import moment from 'moment-timezone'

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
    documents: async function () {
      const { Order } = this.$foundation.data

      // let docs = [...d]
      // console.log(docs.slice().map(d => (d.date)))
      // docs = docs
      

      const timeNow = new Date().getTime()
      let lessSix = timeNow - (0.5 * 60 * 60 * 1000)
      console.log(new Date(lessSix).toISOString())
      const findOrders = await Order.find({
        $and: [{ date: { $gte: new Date(lessSix).toISOString() } }]
      })
      const data = findOrders.data
      let total = 0
      const values = []
      if (data.length > 0) {
        data.slice().map(doc => {
          total = total + doc.amount
          values.push(total)
        })
      }
      
      const labels = data.slice().reverse().map(doc => (moment(doc.date).format('LTS')))
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

    const timeNow = new Date().getTime()
    let lessSix = timeNow - (0.5 * 60 * 60 * 1000)
    console.log(new Date(lessSix).toISOString())
    const findOrders = await Order.find({
      $and: [{ date: { $gte: new Date(lessSix).toISOString() } }]
    })

    if (findOrders.error) {
      return
    }
    if (findOrders.data) {
      console.log('findOrders.data', findOrders.data)
      this.$set(this, 'documents', findOrders.data)
    }

  },
  beforeDestroy() {
    

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
      
      if (this.documents.length > 30) {
        // this.documents.splice(0, 1)
      }
      // 
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
