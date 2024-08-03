
import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import  '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle' ;
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp.jsx';
import { createContext, useReducer } from 'react';
import MyCart from './components/MyCart.jsx';
import MyOrder from './screens/MyOrder.jsx';
 
const CartStateContext = createContext();
const CartDispatchContext = createContext();

 const reducer = (state , action)=>{
  switch(action.type){
   case "ADD":
     return  [...state, {id:action.id, name:action.name , qty:action.qty, size:action.size , price:action.price,img:action.img , finalPrice:action.finalPrice}]; 

     case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index , 1)
       
        return newArr;

      case "UPDATE":
      let arr = [...state]
      arr.find((food,index)=>{
        if(food.id === action.id){
          arr[index] = {...food , qty:parseInt(action.qty) + food.qty , price:action.price + food.price}
        }
        return arr
      })
      return arr;
     
      case "DROP":
        let emptyArr= [];
        return emptyArr;

     default:
       console.log("Error in reducer")
     
  }
}

function App() {

  const [state , dispatch] = useReducer(reducer , [])
  return (<>
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
    <Router>
   <div> 
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/Signup' element={<SignUp/>}/>
      <Route  exact path='/MyCart' element={<MyCart/>}/>
      <Route  exact path='/MyOrder' element={<MyOrder/>}/>

    </Routes>
     </div>

    </Router>
    </CartStateContext.Provider>
    </CartDispatchContext.Provider>
    
   </>
  );
}

export default App;
export {CartStateContext , CartDispatchContext}