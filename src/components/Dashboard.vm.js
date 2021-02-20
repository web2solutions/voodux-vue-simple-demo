/* globals */
import DepositsChart from './DepositsChart.vue'
import DepositsChartBar from './DepositsChartBar.vue'
import LastOrdersListing from './LastOrdersListing.vue'

export default {
  name: 'Dashboard',
  components: {
    DepositsChart,
    DepositsChartBar,
    LastOrdersListing
  },
  props: {

  },
  data: () => ({
    
  }),
  mounted () {
    console.log(this.$foundation)
  },
  beforeUnmount () {
    
  },
  methods: {}
}
