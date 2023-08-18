import { createContext, useContext, useReducer } from "react"
import faker from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducer";

//create context
const Cart = createContext();

//provide context to children
export const Context = ({ children }) => {
  faker.seed(99);   //to handle static data
    const products = [...Array(20)].map(()=>({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.avatar(),  //not working
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }));
    
    // console.log(products);

    //useReducer for cart
    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    //useReducer for filter of products
    const [productState, productDispatch] = useReducer(productReducer, {
      byStock: false,     
      byFastDelivery: false,
      byRating: 0,
      searchQuery: ""
    })

  return (
    <Cart.Provider value={{state, dispatch, productState, productDispatch}}>
        {children}
    </Cart.Provider>
  )
}

//use context
export const CartState = () => useContext(Cart);