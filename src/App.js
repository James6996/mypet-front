import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Login from './components/Login';
import AboutUs from './components/AboutUs';

// Pages
import Shops from './pages/Shops';
import Blog from './pages/Blog';
import Caretakers from './pages/Caretakers';
import Profile from './pages/Profile';
import CaretakerProfile from './pages/CaretakerProfile';

import { checkSession } from './features/authSlice';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkSession());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />

          <div className="App__content">
            <Switch>
              <Route exact path="/blog" render={() => <Blog />} />
              <Route path="/caretakers" exact component={Caretakers} />
              <Route exact path="/contact" render={() => <Contact />} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/shops" exact component={Shops} />
              <Route path="/login" exact component={Login} />
              <Route exact path="/" render={() => <Home />} />
              <Route path="/aboutUs" exact component={AboutUs} />
              <Route
                path="/profile/caretaker"
                exact
                component={CaretakerProfile}
              />
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
