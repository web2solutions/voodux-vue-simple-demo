/* globals */
import DepositsChart from './DepositsChart.vue'
import DepositsChartBar from './DepositsChartBar.vue'
import LastOrdersListing from './LastOrdersListing.vue'
import TotalDeposits from './TotalDeposits.vue'
import TotalOrders from './TotalOrders.vue'

export default {
  name: 'Dashboard',
  components: {
    DepositsChart,
    DepositsChartBar,
    LastOrdersListing,
    TotalDeposits,
    TotalOrders
  },
  props: {

  },
  data: () => ({
    
  }),
  mounted () {
    // console.log(this.$foundation)
  },
  beforeDestroy () {
    
  },
  methods: {}
}
