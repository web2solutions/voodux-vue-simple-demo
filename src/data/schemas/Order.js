// import voodux
import voodux from 'voodux'
import moment from 'moment-timezone'

const schema = new voodux.Foundation.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  shipTo: {
    type: String,
    required: true,
    index: true
  },
  paymentMethod: {
    type: String,
    required: true,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
    index: true
  },
  date: {
    type: Date,
    default: function () {
      return moment()
    },
    index: true
  }
})

schema.set('toJSON', {
  getters: true,
  virtuals: true
})

export default schema
