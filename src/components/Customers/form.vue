<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main">
        <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bcustomer-bottom'>
          <h1 class='h2'>Customer {{$route.params.action}}</h1>
        </div>
        <div class='table-responsive'>
          <form class='needs-validation' noValidate>
            <div class='row g-3'>
              <div class='col-12'>
                <label htmlFor='name' class='form-label'>Name</label>
                <input
                  type='text'
                  class='form-control'
                  name='name'
                  placeholder=''
                  v-model="formSettings.name"
                  required
                />
                <div class='invalid-feedback'>
                  Valid name is required.
                </div>
              </div>
              <div class='col-12'>
                <label htmlFor='email' class='form-label'>Email </label>
                <input
                  type='email'
                  class='form-control'
                  name='email'
                  placeholder='you@example.com'
                  required
                  v-model="formSettings.email"
                />
                <div class='invalid-feedback'>
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div class='col-12'>
                <label htmlFor='address' class='form-label'>Address</label>
                <input
                  type='text'
                  class='form-control'
                  name='address'
                  placeholder='1234 Main St'
                  required
                  v-model="formSettings.address"
                />
                <div class='invalid-feedback'>
                  Please enter your address.
                </div>
              </div>

              <div class='col-md-5'>
                <label htmlFor='cards' class='form-label'>Credit cards</label>
                <select
                  class='custom-select'
                  name='cards'
                  required
                  v-model="formSettings.cards"
                >
                  <option value=''>Choose...</option>
                <option v-for="card in this.cards" :key="card">
                    {{card}}
                </option>
                </select>
                <div class='invalid-feedback'>
                  Please select a valid credit card.
                </div>
              </div>
            </div>

            <hr class='my-4' />

            <button class='w-100 btn btn-primary btn-lg' type='submit'>save</button>
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
  address: 'Seminole, FL',
  email: '',
  cards: []
}

export default {
  name: 'Form',
  components: {},
  props: {},
  data: () => ({
    formSettings: {...defaultFormSettings},
    cards: ['VISA ⠀*** 3719', 'AMEX ⠀*** 5566', 'MASTER ⠀*** 2345', 'VISA ⠀*** 7790'],
  }),
  async mounted () {
    const { action, id } = this.$route.params
    console.log({ action, id })


    this.form = document.querySelectorAll('.needs-validation')[0]
    this.form.addEventListener('submit', this.handleFormSubmit, false)


    if (action === 'edit' && id) {
      const { Customer } = this.$foundation.data

      const findCustomers = await Customer.findById(id)
      if (findCustomers.error) {
        return
      }
      if (findCustomers.data) {
        console.log(findCustomers.data)
        this.$set(this, 'formSettings', findCustomers.data)
      }
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
    async handleFormSubmit (e) {
      e.preventDefault()
      e.stopPropagation()
      const { action, id } = this.$route.params
      const { Customer } = this.$foundation.data
      if (!this.form.checkValidity()) {
        // console.log('not validated')
      }
      this.form.classList.add('was-validated')
      const doc = { ...this.formSettings }
      console.log('========>>>>>>>>>>', doc)
      if (action === 'add') {
        const { /* data, */ error } = await Customer.add(doc)
        if (error) {
          swal('Database error', error.message, 'error')
          return
        }
      } else {
        const { /* data, */ error } = await Customer.edit(id, doc)
        if (error) {
          swal('Database error', error.message, 'error')
          return
        }
      }
      
      router.push('/Customers')
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
