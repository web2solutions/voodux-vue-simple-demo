<template>
  <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 bproduct-bottom"
    >
      <h1 class="h2">Products</h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group me-2">
          <router-link
            class="btn btn-sm btn-outline-secondary"
            to="/Products/add"
            tag="button"
          >
            Add new Product
          </router-link>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Vendor</th>
            <th align="right">Price</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in this.documents" :key="doc.__id">
            <td>{{ doc.name }}</td>
            <td>{{ doc.vendor }}</td>
            <td>USD {{ formatter().format(doc.price_cost) }}</td>
            <td>
              <router-link class="primary" :to="`/Products/edit/${doc.__id}`"
                >[edit]</router-link
              >
              |
              <a
                color="primary"
                @click="handleDeleteProduct($event, doc.__id)"
                href="#"
                >[delete]</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
/* globals */

import swal from 'sweetalert'
import moment from 'moment'

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export default {
  name: 'Products',
  components: {},
  props: {},
  data: () => ({
    documents: []
  }),
  async mounted () {
    const { Product } = this.$foundation.data

    this.onAddDocHandlerListener = Product.on('add', this.onAddDocHandler)
    this.onEditDocHandlerListener = Product.on('edit', this.onEditDocHandler)
    this.onDeleteDocHandlerListener = Product.on(
      'delete',
      this.onDeleteDocHandler
    )

    const findProducts = await Product.find({})
    if (findProducts.error) {
      return
    }
    if (findProducts.data) {
      console.log(findProducts.data)
      this.$set(this, 'documents', findProducts.data)
    }
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy () {
    const { Product } = this.$foundation.data
    Product.stopListenTo(this.onAddDocHandlerListener)
    Product.stopListenTo(this.onEditDocHandlerListener)
    Product.stopListenTo(this.onDeleteDocHandlerListener)
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
    onAddDocHandler (eventObj) {
      const { error, document, foundation, data } = eventObj
      console.log({ error, document, foundation, data })
      if (error) {
        return
      }
      this.documents.unshift(data)
    },
    onEditDocHandler (eventObj) {
      const { error, document, foundation, data } = eventObj
      console.log({ error, document, foundation, data })
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id) {
          this.$set(this.documents, index, data)
        }
      })
    },
    onDeleteDocHandler (eventObj) {
      const { error, document, foundation, data } = eventObj
      console.log({ error, document, foundation, data })
      this.documents.forEach((doc, index) => {
        if (doc.__id === data.__id) {
          this.documents.splice(index, 1)
        }
      })
    },
    async handleDeleteProduct (e, ___id) {
      console.log(e, ___id)
      const { Product } = this.$foundation.data
      e.preventDefault()
      // console.error(___id)
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(async willDelete => {
        if (willDelete) {
          const r = await Product.delete(___id)
          // console.error(r)
          if (r.error) {
            swal('Database error', e.error.message, 'error')
            return
          }
          swal('Poof! The order has been deleted!', {
            icon: 'success'
          })
        } else {
          swal('The Product is safe!')
        }
      })
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
