import './App.css';
import Login from './components/Login';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import {getUserAuth} from './actions';

function App(props) {

  useEffect(() =>{
    props.getUserAuth();
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={
              <>
                <Header />
                <Home />
              </>
            } 

          />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  getUserAuth:() =>dispatch(getUserAuth())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
