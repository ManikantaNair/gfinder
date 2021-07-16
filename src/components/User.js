import React, { Fragment, Component } from 'react';
import {Link} from 'react-router-dom';
import Repos from './Repos';

class User extends Component {
    componentDidMount (){
        this.props.getDetails(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    render() {
        const{name,avatar_url,
        location,bio,blog,login,html_url,followers,following,
        public_repos,public_gists,company,hireable} = this.props.user;
        return (
            <Fragment>
                <Link to ='/' className="btn btn-dark">
                Back to Search</Link>
                Hireable : {''}
                {hireable ? (
                    <i className ='fa fa-check text-success'/>):
                    ( <i className ='fa fa-times-circle text-danger' />
                )}
                <div className ='card grid-2'>
                    <div className="all center">
                        <img src={avatar_url} className="round-img" alt ="" style ={{width:'150px'}} />
                        <h1>{name}</h1>
                        <p>Location:{location}</p>
                    </div>
                    <div>
                        {bio && (<Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>)}
                        <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                        <ul>
                            <li>
                                {company && 
                                    <Fragment>
                                        <strong>Username:{login}</strong>
                                    </Fragment>
                                }
                            </li>
                            <li>
                                {blog && 
                                    <Fragment>
                                        <strong>Website:{blog}</strong>
                                    </Fragment>
                                }
                            </li>
                            <li>
                                {login && 
                                    <Fragment>
                                        <strong>Company:{company}</strong>
                                    </Fragment>
                                }
                            </li>
                        </ul>
                    </div>
               </div>
               <div className ="card text-center">
                   <div className="badge badge-primary">Followers:{followers}</div>
                   <div className="badge badge-success">Following:{following}</div>
                   <div className="badge badge-danger">Public Repos:{public_repos}</div>
                   <div className="badge badge-dark">Public Gists:{public_gists}</div>
               </div>
               <Repos repos={this.props.repos}/>
            </Fragment>
           
        );
    }
}

export default User;