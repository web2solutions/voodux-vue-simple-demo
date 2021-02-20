/* global */
export default async function (eventObj) {
  const { /* data, */ foundation, error } = eventObj
  if (error) {
    throw new Error(`Error starting foundation stack: ${error}`)
  }
  const { User, Product, Customer, Order } = foundation.data
  const Eduardo = await User.add({
    name: 'Eduardo Almeida',
    username: 'web2'
  })
  console.debug('Eduardo', Eduardo)

  const Volvo = await Product.add({
    name: 'Volvo XC90',
    vendor: 'Volvo',
    price_cost: 150000
  })
  
  console.debug('Volvo', Volvo)

  const EduardoCustomer = await Customer.add({
    name: 'Eduardo Almeida',
    address: 'Boca Raton, FL - USA',
    email: 'web2solucoes@gmail.com',
    cards: ['Visa *** 3944', 'Master *** 3955']
  })
  console.debug('EduardoCustomer', EduardoCustomer)

  const JoeCustomer = await Customer.add({
    name: 'Joe Biden',
    address: 'Seminole, FL - USA',
    email: 'joe@biden.com',
    cards: ['Visa *** 3489', 'Master *** 2345']
  })
  console.debug('JoeCustomer', JoeCustomer)
  
  const orders = []

  for (let x = 0; x < 20; x++) {
    const factor = x === 0 ? 0.5 : x
    const time = factor * 30000
    orders.push(new Promise(resolve =>{
      setTimeout(async () => {
        const response = await Order.add({
          name: 'Joe Biden',
          shipTo: 'Seminole, FL - USA',
          amount: Number(`${Math.floor(Math.random()*100)}.${Math.floor(Math.random()*100)}`),
          paymentMethod: 'Visa *** 3489'
        })
        resolve(response)
      }, time)
    }))
  }
  
  Promise.all(orders).then(function (values) {
    console.log()
    console.log(values)
  })
}
