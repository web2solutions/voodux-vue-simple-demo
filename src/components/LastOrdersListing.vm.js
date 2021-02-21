
import moment from 'moment'
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  name: 'LastOrdersListing',
  props: {
    msg: String
  },
  data: () => ({
    documents: []
  }),

  async mounted () {
    const { Order } = this.$foundation.data
    

    this.onAddDocHandlerListener = Order.on('add', this.onAddDocHandler)
    this.onEditDocHandlerListener = Order.on('edit', this.onEditDocHandler)
    this.onDeleteDocHandlerListener = Order.on('delete', this.onDeleteDocHandler)

    const timeNow = new Date().getTime()
    let lessSix = timeNow - 0.5 * 60 * 60 * 1000
    console.log(new Date(lessSix).toISOString())
    const findOrders = await Order.find({
      $and: [{ date: { $gte: new Date(lessSix).toISOString() } }]
    })

    if (findOrders.error) {
      return
    }
    if (findOrders.data) {
      // console.log(findOrders.data)
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
