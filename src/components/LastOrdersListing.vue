<template>
    <div class="table-responsive">
         <table class='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Ship to</th>
                <th>Payment method</th>
                <th align='right'>Amount</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="doc in this.documents" :key="doc.__id">
                    <td>{{moment()(doc.date).calendar()}}</td>
                    <td>{{doc.name}}</td>
                    <td>{{doc.shipTo}}</td>
                    <td>{{doc.paymentMethod}}</td>
                    <td align='right'>USD {{formatter().format(doc.amount)}}</td>
                </tr>
            </tbody>
          </table>
    </div>
</template>



<script>
import LastOrdersListing from './LastOrdersListing.vm.js'
export default LastOrdersListing
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
