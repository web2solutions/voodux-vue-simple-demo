/* globals */
import DepositsChart from './DepositsChart.vue'
import LastOrdersListing from './LastOrdersListing.vue'

export default {
  name: 'Dashboard',
  components: {
    DepositsChart,
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
