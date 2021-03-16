<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4 main">
        <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bproduct-bottom'>
          <h1 class='h2'>Product {{$route.params.action}}</h1>
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
                <label htmlFor='email' class='form-label'>Vendor</label>
                <input
                  type='text'
                  class='form-control'
                  name='vendor'
                  placeholder='Brand name'
                  required
                  v-model="formSettings.vendor"
                />
                <div class='invalid-feedback'>
                  Please enter a valid Vendor name
                </div>
              </div>

              <div class='col-12'>
                <label htmlFor='address' class='form-label'>Price</label>
                <input
                  type='number'
                  class='form-control'
                  name='price_cost'
                  placeholder=''
                  required
                  v-model="formSettings.price_cost"
                />
                <div class='invalid-feedback'>
                  Please enter a valid price
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
  vendor: '',
  price_cost: ''
}

export default {
  name: 'Form',
  components: {},
  props: {},
  data: () => ({
    formSettings: {...defaultFormSettings}
  }),
  async mounted () {
    const { action, id } = this.$route.params
    console.log({ action, id })


    this.form = document.querySelectorAll('.needs-validation')[0]
    this.form.addEventListener('submit', this.handleFormSubmit, false)


    if (action === 'edit' && id) {
      const { Product } = this.$foundation.data

      const findProducts = await Product.findById(id)
      if (findProducts.error) {
        return
      }
      if (findProducts.data) {
        console.log(findProducts.data)
        this.$set(this, 'formSettings', findProducts.data)
      }
    }
    
  },

  methods: {
    moment () {
      return moment
    },
    formatter () {
      return formatter
    },
    async handleFormSubmit (e) {
      e.preventDefault()
      e.stopPropagation()
      const { action, id } = this.$route.params
      const { Product } = this.$foundation.data
      if (!this.form.checkValidity()) {
        // console.log('not validated')
      }
      this.form.classList.add('was-validated')
      const doc = { ...this.formSettings }
      console.log('========>>>>>>>>>>', doc)
      if (action === 'add') {
        const { /* data, */ error } = await Product.add(doc)
        console.log(error)
        if (error) {
          swal('Database error', (error.message || error), 'error')
          return
        }
      } else {
        const { /* data, */ error } = await Product.edit(id, doc)
        console.log(error)
        if (error) {
          swal('Database error', (error.message || error), 'error')
          return
        }
      }
      
      router.push('/Products')
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
