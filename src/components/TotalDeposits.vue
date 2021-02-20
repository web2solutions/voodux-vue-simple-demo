<template>
    <div class="card">
          <div class="card_title">
            <h2>Total Deposits</h2>
          </div>
          <div class="card_body">
            <h3>{{ total }}</h3>
          </div>
        </div>

</template>



<script>
import TotalDeposits from './TotalDeposits.vm.js'
export default TotalDeposits
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3, h2 {
    color: rgb(49, 49, 117);
}
.card{
    margin-top:2em;
}
</style>
