
import moment from 'moment'
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  name: 'TotalDeposits',
  props: {
    msg: String
  },
  data: () => ({
      documents: [],
      total: 0,
  }),
    watch: {
        documents: function (d) {
            this.total = formatter.format(d.map(doc => (doc.amount)).reduce((p, v) => {
                return (p + v)
            }, 0))
        }
    },
  async mounted () {
    const { Order } = this.$foundation.data
    

    this.onAddDocHandlerListener = Order.on('add', this.onAddDocHandler)
    this.onEditDocHandlerListener = Order.on('edit', this.onEditDocHandler)
    this.onDeleteDocHandlerListener = Order.on('delete', this.onDeleteDocHandler)

    const findOrders = await Order.findAll({})
    if (findOrders.error) {
      return
    }
    if (findOrders.data) {
      console.log(findOrders.data)
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
    moment () {
        return moment
    },
    formatter () {
        return formatter
    },
    onAddDocHandler (eventObj) {
      const { error, data } = eventObj
      if (error) {
        return
      }
      this.documents.unshift(data)
    },
    onEditDocHandler (eventObj) {
      const { data } = eventObj
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id) {
          this.$set(this.documents, index, data)
        }
      })
    },
    onDeleteDocHandler (eventObj) {
      const { data } = eventObj
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id) {
          this.documents.splice(index, 1)
        }
      })
    }
  }
}
