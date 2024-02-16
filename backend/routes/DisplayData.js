const express = require('express');
const router = express.Router();

router.post('/cartdata',(req,res)=>{
    try{
       // console.log(global.cart_items)
        res.send([global.cart_items , global.item_category])
    }catch(error)
    {
        console.error(error.message)
        res.send("internal server error")

    }
})

module.exports = router