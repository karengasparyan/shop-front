import React, {Component, ReactNode} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Contacts from "./pages/Contacts";
import Shop from "./pages/Shop";
import SingleProduct from "./pages/SingleProduct"
import ShoppingCart from "./components/Shop/ShoppingCart";
import CheckOut from "./components/Shop/CheckOut";
import {ToastContainer} from "react-toastify";
import ShippingAndPayment from "./pages/ShippingAndPayment";
import Guarantee from "./pages/Guarantee";
import Helmet from 'react-helmet';
import Media from "react-media";
import MobileLeftBar from "./components/Header/MobileLeftBar";

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
   console.log("%cЗдравствуйте!", "color:red;font-weight:bold;font-size:45px;")
   console.log("%cЕсли у вас ест какие то вапроси разработчику можете написат!👌👇","color:#565656;font-weight:500;font-size:20px;")
   console.log("%chttps://www.linkedin.com/in/karen-gasparyan-1b897a203","color:#565656;font-weight:500;font-size:20px;")

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/shopping-cart" exact component={ShoppingCart}/>
            <Route path="/check-out" exact component={CheckOut}/>
            <Route path="/contacts" exact component={Contacts}/>
            <Route path="/shipping-payment" exact component={ShippingAndPayment}/>
            <Route path="/guarantee" exact component={Guarantee}/>
            <Route path="/product/:id" exact component={SingleProduct}/>
            <Route component={Error404}/>
          </Switch>
        </BrowserRouter>
        <Media query="(min-width: 768px)" render={() => (
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
        )}/>
        <Media query="(max-width: 767px)" render={() => (
          <ToastContainer
            position="bottom-center"
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
        )}/>
      </>
    );
  }
}

export default App;
