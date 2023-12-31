import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ItemsPage from './components/ItemsPage/ItemsPage';
import SuppliersPage from './components/SuppliersPage/SuppliersPage'
import RequestsPage from './components/RequestsPage/RequestsPage';
import POPage from './components/PO-Page/POPage';
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user);

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/items'>
            <ItemsPage user={user}/>
          </Route>
          <Route path='/suppliers'>
            <SuppliersPage user={user}/>
          </Route>
          <Route path='/requests'>
            <RequestsPage user={user}/>
          </Route>
          <Route path='/purchase_orders'>
            <POPage user={user}/>
          </Route>
          <Route exact path="/">
            {(user) ? <Redirect to="/items" /> : <LoginFormPage />}
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
