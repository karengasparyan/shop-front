import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Contacts from "./pages/Contacts";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct"
import ShoppingCart from "./components/Shop/ShoppingCart";
import CheckOut from "./components/Shop/CheckOut";
import {ToastContainer} from "react-toastify";

class App extends Component {
  render() {
    const contextClass = {
      success: "toastSuccess",
      error: "toastError",
      info: "toastInfo",
      warning: "toastWarning",
      default: "toastDefault",
      dark: "toastDark toastDarkBlue",
    };
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/shopping-cart" exact component={ShoppingCart}/>
            <Route path="/check-out" exact component={CheckOut}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path="/product/:id" exact component={SingleProduct}/>
            <Route component={Error404}/>
          </Switch>
        </BrowserRouter>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
          bodyClassName="toastBody"
          toastClassName={({type}) => contextClass[type || "default"] +
            " flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
          }
        />
      </>
    );
  }
}

export default App;
