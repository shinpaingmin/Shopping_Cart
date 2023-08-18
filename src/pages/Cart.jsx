import React, { useEffect, useState } from 'react'
import shoe from '../img/shoe.jpg';
import { CartState } from '../context/Context'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { AiFillDelete } from 'react-icons/ai';

const Cart = () => {
  //use context
  const {state: {cart}, dispatch} = CartState();

  //total price
  const [total, setTotal] = useState();

  //accumulate total price 
  useEffect(()=>{
    setTotal(cart.reduce((acc, cartItem)=> acc + Number(cartItem.price * cartItem.qty), 0))   //total = total + (price*qty)
  }, [cart])

  return (
    <div className='d-flex'>
      <div className="productContainer">
        <ListGroup>
          {
            cart.map((cartItem)=>(
              <ListGroup.Item key={cartItem.id}>
                <Row>
                  <Col md={2}>
                    <Image src={shoe} alt={cartItem.name} fluid rounded/>
                  </Col>
                  <Col md={2}>
                    <span>{cartItem.name}</span>
                  </Col>
                  <Col md={2}>
                    <span>${cartItem.price}</span>
                  </Col>
                  <Col md={2}>
                    <Rating rate={cartItem.ratings}/>
                  </Col>
                  <Col md={2}>
                    <Form.Control as="select" value={cartItem.qty}
                      onChange={(e)=>dispatch({type: "CHANGE_CART_QTY", payload: {id: cartItem.id, qty: e.target.value}})}
                    >
                      {
                        [...Array(cartItem.inStock).keys()].map((i)=>(
                          <option key={i+1}>{i+1}</option>
                        ))
                        //or
                        // [...Array(cartItem.inStock)].map((_,i)=>(
                        //   <option key={i+1}>{i+1}</option>
                        // ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>dispatch({type: "REMOVE_FROM_CART", payload: cartItem})}>
                      <AiFillDelete fontSize='20px'/>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
      <div className="filter summary">
        <span className="title">SubTotal - {cart.length} items</span>
        <div style={{'fontWeight':'700px', 'fontSize':'20px', 'margin':'10px 0'}}>Total: ${total}</div>
        <Button type='button' disabled={cart.length===0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default Cart