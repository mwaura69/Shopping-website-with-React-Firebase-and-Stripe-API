const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('put in your stripe sk here')

const app = express();
app.use(cors())
app.use(express.static("public"))
app.use(express.json())

app.post("/checkout", async(req, res) => {
    /*
    req.body.items
    [
        {
            id:1,
            quantity: 1
        }
    ]
    */
   console.log(req.body)
    const items = req.body.item;
    let lineItems = []
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item,
                quantity: item.length
            }
        )
        })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:5173/success",
        cancel_url : "http://localhost:5173/cancel",
    })

    res.send(JSON.stringify({
        url: session.url
    }))
})

app.listen(4000, () => console.log('listening on port 4000'))
