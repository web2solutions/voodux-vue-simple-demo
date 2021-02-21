
import moment from 'moment'
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  name: 'TotalOrders',
  props: {
    msg: String
  },
  data: () => ({
      documents: [],
      total: 0,
  }),
  async mounted () {
    const { Order } = this.$foundation.data
    

    this.onAddDocHandlerListener = Order.on('add', this.count)
    this.onEditDocHandlerListener = Order.on('edit', this.count)
    this.onDeleteDocHandlerListener = Order.on('delete', this.count)

    await this.count()
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
    async count() {
      const { Order } = this.$foundation.data
      const findOrders = await Order.count()
      if (findOrders.error) {
        return
      }
      if (findOrders.data) {
        // console.log(findOrders.data)
        this.$set(this, 'total', findOrders.data)
      }
    }
  }
}
