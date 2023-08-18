import React from 'react'
import shoe from '../img/shoe.jpg';
import { Badge, Button, Container, Dropdown, Form, Navbar } from 'react-bootstrap'
import { CartState } from '../context/Context'
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {
    //use context
    const {state: {cart}, dispatch, productDispatch} = CartState();

    return (
        <Navbar bg='primary' style={{'padding':'25px 0'}}>
            <Container>
                <Navbar.Brand href='#' className='text-light fs-2'>
                    <i className="fa-solid fa-cart-shopping"></i> Shopping Cart
                </Navbar.Brand>

                <Navbar.Text className='mx-auto'>        {/** Navbar.Text define width */}
                    <Form.Control
                    type="search"
                    className='search'
                    placeholder="Search a product"
                    style={{'minWidth':'500px'}}
                    aria-label="Search"
                    onChange={(e)=>{
                        productDispatch({type: "FILTER_BY_SEARCH", payload: e.target.value})
                    }}
                    />
                </Navbar.Text>  

                
                <Dropdown>
                    <Dropdown.Toggle variant='success'>
                        <i className="fa-solid fa-cart-shopping me-2"></i>
                        <Badge bg='success'>{cart.length}</Badge>
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{'minWidth':'360px', 'transform':'translateX(-75%)'}} marginRight>
                        {
                            cart.length > 0 ? (
                                <div>
                                    {
                                        cart.map((cartItem)=>(
                                            <div className='cartItem' key={cartItem.id}>
                                                <img src={shoe} alt={cartItem.name} className='cartItemImg'/>
                                                <div className="cartItemDetail">
                                                    <span>{cartItem.name}</span>
                                                    <span>${cartItem.price.split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete type='button' onClick={()=>dispatch({type: "REMOVE_FROM_CART", payload: cartItem})} fontSize="20px" style={{"cursor":"pointer"}} />
                                            </div>
                                        ))
                                    }
                                    <Link to="/cart">
                                        <Button style={{"width": "95%", "margin":"0 10px"}}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <span style={{'padding':'10px'}}>Cart is Empty!</span>
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
              
            </Container>
        </Navbar>
    )
}

export default Header