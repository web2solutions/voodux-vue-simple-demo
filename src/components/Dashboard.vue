<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">Deposits</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Share
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Export
          </button>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle"
        >
          <span data-feather="calendar"></span>
          This week
        </button>
      </div>
    </div>
    
    <div class="row">
      <div class="col col-md-6">
        <DepositsChart></DepositsChart>
      </div>
      <div class="col col-md-4">
        <DepositsChartBar></DepositsChartBar>
      </div>
      <div class="col col-md-2">
       <TotalDeposits></TotalDeposits>
       <TotalOrders></TotalOrders>

      </div>
    </div>
    <h2>Last Orders</h2>
    <LastOrdersListing></LastOrdersListing>
  </main>
</template>



<script>
import Dashboard from './Dashboard.vm.js'
export default Dashboard
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
