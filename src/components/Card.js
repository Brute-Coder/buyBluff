import React, { useEffect, useRef, useState } from 'react'
import { useDispathCart, useCart } from './ContextReducer'

export default function Card(props) {
   
    let options = props.options
    const [qty,setQty] = useState(1)
    const [size,setSize] = useState("")
    let data = useCart()
    let dispatch = useDispathCart();
    let priceOptions = Object.keys(options)
    const priceRef = useRef( )
    const handleAddToCart = async()=>{
        // here we need to implement update logic
        let addedItem = []
        for(const item of data)
        {
            if(item.id === props.itemName._id) {addedItem = item;break;}
        }
        if(addedItem.length !== 0) 
        {
            if(addedItem.size === size){
                await dispatch({type:"UPDATE",id:props.itemName._id,price:finalPrice,qty:qty})
                return
            }
            else if(addedItem.size !== size){
                await dispatch({type:"ADD",id : props.itemName._id,name:props.itemName.name,img:props.itemName.img, price:finalPrice,qty:qty,size:size})
                return
            }
            return
        }
        await dispatch({type:"ADD",id : props.itemName._id,name:props.itemName.name,img:props.itemName.img, price:finalPrice,qty:qty,size:size})
         
    }
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])

    let finalPrice = qty * parseInt(options[size])

    return (

        <div>
            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
                <img src={props.itemName.img} className="card-img-top" alt="..."  style={{height : "200px",objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.itemName.name}</h5>
                    <p className="card-text">if you have money buy it </p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded'  onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select >
                        <select className='m-2 h-100 bg-success rounded' ref ={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((Optionitem)=>{
                               return <option key = {Optionitem} value={Optionitem}>{Optionitem}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                           ₹{finalPrice}/-
                        </div>
                    <hr></hr>
                    <button className= {'btn btn-success justify-center ms-2 '} onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
