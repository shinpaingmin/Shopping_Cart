import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from '../components/SingleProduct';
import Filter from '../components/Filter';

const Home = () => {
    const { state: {products}, productState: {byStock, byFastDelivery, byRating, sort, searchQuery} } = CartState();
    // console.log(products);
    
    //display products
    const transformProducts = () => {
      let sortedProducts = products;

      //sort by price
      if(sort) {
        sortedProducts = sortedProducts.sort((a, b)=>(
          sort==='lowToHigh'? a.price - b.price : b.price - a.price
        ))
      }

      //instock
      if(!byStock) {
        sortedProducts = sortedProducts.filter((prod)=>prod.inStock);
      }

      //fast delivery
      if(byFastDelivery) {
        sortedProducts = sortedProducts.filter((prod)=>prod.fastDelivery);
      }

      //sort by rating
      if(byRating) {
        sortedProducts = sortedProducts.filter((prod)=>prod.ratings >= byRating)
      }

      //search box
      if(searchQuery) {
        sortedProducts = sortedProducts.filter((prod)=>prod.name.toLowerCase().includes(searchQuery))
      }
      return sortedProducts;
    }
  return (
    <div className='d-flex align-items-start'>
        <Filter/>
        <div className='productContainer' >
          {
            transformProducts().map((item)=> (
              <SingleProduct key={item.id} item = {item}/>
            ))
          }
        </div>
    </div>
  )
}

export default Home