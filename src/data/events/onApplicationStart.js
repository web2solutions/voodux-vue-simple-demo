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
  
  const customers = [
    {
      name: 'Joe Biden',
      shipTo: 'Seminole, FL - USA',
      paymentMethod: 'Visa *** 3489'
    },
    {
      name: 'Eduardo Almeida',
      shipTo: 'Boca Raton, FL - USA',
      paymentMethod: 'Visa *** 3944'
    }
  ]
  const orders = []

  for (let x = 0; x < 100; x++) {
    const factor = x === 0 ? 0.5 : x
    const time = factor * 5000
    orders.push(new Promise(resolve =>{
      setTimeout(async () => {
        const cust = customers[Math.floor(Math.random() * customers.length)]
        const response = await Order.add({
          name: cust.name,
          shipTo: cust.shipTo,
          amount: Number(`${Math.floor(Math.random()*1000)}.${Math.floor(Math.random()*100)}`),
          paymentMethod: cust.paymentMethod
        })
        resolve(response)
      }, time)
    }))
  }
  
  Promise.all(orders).then(values => {
    console.log(values)
  })
}
