// main menu template file
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import Repositories from './Repositories';

class Main extends Component {
    render() {
        return(
            <Switch>
                <Route
                  exact
                  path='/'
                  render={(props)=> 
                    <Profile 
                      user_data={this.props.user_data}
                      events_data={this.props.events_data}
                      followers_data={this.props.followers_data}
                      following_data={this.props.following_data}
                    />
                  }/>
                  <Route
                    exact
                    path='/repo'
                    render={()=> 
                    <Repositories
                      repo_data={this.props.repo_data}
                    />
                  }/>
             </Switch>
        );
    }
}

export default Main;