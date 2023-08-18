import React from 'react'
import shoe from '../img/shoe.jpg';
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../context/Context';

const SingleProduct = ({item}) => {
  //use context
  const { state: {cart}, dispatch} = CartState();
  // console.log(cart);
  return (
    <div className='products'>
        <Card>
          <Card.Img variant='top'src={shoe} alt={item.name}/>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle style={{paddingBottom: 10}}>
              <span>${item.price.split(".")[0]}</span>
              {
                item.fastDelivery ? (
                  <div>Fast Delivery</div>
                ) :
                (
                  <div>4 Days Delivery</div>
                )
              }
              <Rating rate={item.ratings} status={false}/>
            </Card.Subtitle>
            {
              cart.some((cartItem)=>cartItem.id === item.id) ? (
                <Button onClick={()=>dispatch({type: "REMOVE_FROM_CART", payload: item})} variant='danger'>Remove from Cart</Button>    
              ) : (
                <Button onClick={()=>dispatch({type: "ADD_TO_CART", payload: item})} disabled={!item.inStock}>{item.inStock? "Add to Cart" : "Out of Stock"}</Button>
              )
            }  
          </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProduct