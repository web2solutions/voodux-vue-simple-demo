<template>
  <main role="main"  class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
          <h1 className='h2'>Orders</h1>
          <div className='btn-toolbar mb-2 mb-md-0'>
            <div className='btn-group me-2'>
                <button type='button' className='btn btn-sm btn-outline-secondary'>
                  Add new Order
                </button>
            </div>
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Ship to</th>
                <th>Payment method</th>
                <th align='right'>Amount</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {this.orders.map((doc) => (
                <tr key={doc.id}>
                  <td>{moment(doc.date).subtract(6, 'days').calendar()}</td>
                  <td>{doc.name}</td>
                  <td>{doc.shipTo}</td>
                  <td>{doc.paymentMethod}</td>
                  <td align='right'>USD {formatter.format(doc.amount)}</td>
                  <td>
                    <a color='primary' href='#'>[delete]</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </main>
</template>



<script>
/* globals */

export default {
  name: 'Orders',
  components: {

  },
  props: {

  },
  data: () => ({
    orders: []
  }),
  mounted () {
    console.log(this.$foundation)
    console.log(this.name)
  },
  beforeUnmount () {
    
  },
  methods: {}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
