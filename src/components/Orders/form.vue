<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bcustomer-bottom"
    >
      <h1 class="h2">Order {{ $route.params.action }}</h1>
    </div>
    <div class="table-responsive">
      <form class="needs-validation" noValidate>
        <div class="row g-3">
          <div class="col-12">
            <label htmlFor="name" class="form-label">Select the Customer</label>
            <select
              class="custom-select"
              name="name"
              required
              v-model="formSettings.customerId"
              @change="selectCustomer($event)"
            >
              <option value="">Choose...</option>
              <option v-for="c in this.orders" :value="c.__id" :key="c.__id">
                {{ c.name}}
              </option>
            </select>
            <div class="invalid-feedback">
              Please select a valid credit card.
            </div>
          </div>
          <div class="col-12">
            <label htmlFor="amount" class="form-label">Amount </label>
            <input
              type="number"
              class="form-control"
              name="amount"
              placeholder="0.00"
              required
              v-model="formSettings.amount"
            />
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

        </div>

        <hr class="my-4" />

        <button class="w-100 btn btn-primary btn-lg" type="submit">save</button>
      </form>
    </div>
  </main>
</template>

<script>
/* globals */

import swal from 'sweetalert'
import moment from 'moment'
import router from '../../router'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const defaultFormSettings = {
  name: '',
  shipTo: '',
  paymentMethod: '',
  amount: '',
  customerId: ''
}

export default {
  name: 'Form',
  components: {},
  props: {},
  data: () => ({
    formSettings: { ...defaultFormSettings },
    orders: [],
    cards: [
      'VISA ⠀*** 3719',
      'AMEX ⠀*** 5566',
      'MASTER ⠀*** 2345',
      'VISA ⠀*** 7790'
    ]
  }),
  async mounted () {
    const { action, id } = this.$route.params
    console.log({ action, id })

    this.form = document.querySelectorAll('.needs-validation')[0]
    this.form.addEventListener('submit', this.handleFormSubmit, false)

    const { Order } = this.$foundation.data

    const findOrder = await Order.findAll()
    if (findOrder.error) {
        return
    }
    if (findOrder.data) {
        console.log(findOrder.data)
        this.$set(this, 'orders', findOrder.data)
    }
  },

  methods: {
    moment () {
      return moment
    },
    swal () {
      return swal
    },
    formatter () {
      return formatter
    },
    async selectCustomer (e){
        const { Customer } = this.$foundation.data
        if (e.target.value === '') {
            this.$set(this, 'formSettings', {...defaultFormSettings})
            return
        }
        const { error, data } = await Customer.findById(e.target.value)
        console.log({ error, data })
        this.$set(this, 'formSettings', {
            name: data.name,
            shipTo: data.address,
            paymentMethod: data.cards[0],
            amount: '',
            customerId: data.__id
        })
        
    },
    
    async handleFormSubmit (e) {
      e.preventDefault()
      e.stopPropagation()
      const { action, id } = this.$route.params
      const { Order } = this.$foundation.data
      if (!this.form.checkValidity()) {
        // console.log('not validated')
      }
      this.form.classList.add('was-validated')
      const doc = { ...this.formSettings }
      console.log('========>>>>>>>>>>', doc)
      if (action === 'add') {
        const { /* data, */ error } = await Order.add(doc)
        if (error) {
          swal('Database error', error.message, 'error')
          return
        }
      } else {
        const { /* data, */ error } = await Order.edit(id, doc)
        if (error) {
          swal('Database error', error.message, 'error')
          return
        }
      }

      router.push('/Orders')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  /* rtl:remove */
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  height: auto;
}

.needs-validation {
  overflow: hidden;
}
</style>
