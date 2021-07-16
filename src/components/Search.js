import React, { Component } from 'react';


class Search extends Component {
    state={
        text :''
    }

 onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
} 
 onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('Please enter something', 'light');
        } 
        else{
        this.props.searchName(this.state.text);
        this.setState({ text : ''});
        }

    }
    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                <input type="text" name="text" placeholder="Search here..." value={this.state.text} onChange={this.onChange} />
                <input type='submit' value="Search" className="btn btn-dark btn-block"/>
                </form>
                {this.props.showClear && <button type="submit" className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button>}
                
            </div>
        );
    }
}

export default Search;