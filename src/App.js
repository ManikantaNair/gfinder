import React,{Fragment} from 'react';
import Navbar from './components/Navbar';
import Users from './components/Users';
import axios from 'axios';
import Search from './components/Search';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import About from './components/About';
import User from './components/User';

import './App.css';


class App extends React.Component {

  state={
    users:[],
    alert :null,
    user : {},
    repos : []
  };

  // async componentDidMount(){
  //   const res=  await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
  //   this.setState({
  //     users: res.data
  //   });
  // }

  searchName = async text =>{
    const res=  await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
    this.setState({
      users: res.data.items
    });
  }

  clearUsers = () =>{
    this.setState({
      users: []
    })
  }

  setAlert = (msg,type) =>{
    this.setState ({
         alert:{ msg, type}
    });
    setTimeout(() => {
      this.setState({ alert: null})
    }, 5000);
  }

  getDetails = async username =>{
    const res=  await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
    this.setState({
      user: res.data
    });
  }


  //Get User Repo//
  getUserRepos = async username =>{
    const res=  await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
    this.setState({
      repos: res.data
    });
  }

  
 render(){
  return (
    <Router>
      <div className="app">
      <Navbar />
    
      <div className="container">
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path="/" render ={
          props =>(
           <Fragment>
             <Search searchName={this.searchName} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true: false }
      setAlert={ this.setAlert}/>
      <Users users={this.state.users}/>
           </Fragment>
          )
        } />
      <Route exact path ="/about" component ={About}></Route>
      <Route exact path ="/user/:login" render ={
        props =>(
          <Fragment>
            <User getDetails={this.getDetails} user={this.state.user} {...props} 
              getUserRepos={this.getUserRepos} repos={this.state.repos}/>
          </Fragment>
        )
      } />
      </Switch>
      </div>
     
      </div> 
      </Router> 

  );
 }
}

export default App;