import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./LoginForm";
import CustomerDeatil from "./CustomerDetail";
import CustomerList from "./CustomerList";
import UpdateCustomer from "./UpdateCustomer";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/customer-detail" component={CustomerDeatil} />
          <Route exact path="/customer-list" component={CustomerList} />
          <Route exact path="/customer-update" component={UpdateCustomer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
