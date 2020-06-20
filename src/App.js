import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios';  
import { Layout } from 'antd';
import SideMenu from './components/SideMenu';
import SearchBox from './components/SearchBox';
import Main from './components/Main';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    user_data: null, 
    repo_data: [],
    events_data: [],
    followers_data: [],
    following_data: [],
  }

  // fetchData: extract user data from GitHub through axios commands
  fetchData(username) {
    // returns a promise
    axios.get(`https://api.github.com/users/${username}`)
      .then((user_response)=>{
        this.setState({
          user_data: {
            name: user_response.data.name,
            bio: user_response.data.bio,
            avatar_url: user_response.data.avatar_url,
            followers: user_response.data.followers,
            following: user_response.data.following,
          }
        })
      })
      .catch((error) =>{
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then((repo_response)=> {
        this.setState({
          repo_data: repo_response.data.map(repo => ({
            id: repo.id,
            name: repo.name,
            owner: repo.owner,
            description: repo.description,
            html_url: repo.html_url,
          }))
        })
      })
      .catch((error) =>{
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/events`)
      .then((event_response)=> {
        this.setState({
          events_data: event_response.data.map(event => ({
            type: event.type,
            repo: event.repo,
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/followers`)
      .then((follower_response)=> {
        this.setState({
          followers_data: follower_response.data.map(follower => ({
            login: follower.login,
            html_url: follower.html_url,
            avatar_url: follower.avatar_url,
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`https://api.github.com/users/${username}/following`)
      .then((following_response)=> {
        this.setState({
          following_data: following_response.data.map(following => ({
            login: following.login,
            html_url: following.html_url,
            avatar_url: following.avatar_url,
          }))
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData('paulopiyo777');
  }
  render() {
    return (
      <Layout>
        <Sider style={{overflow: 'auto', height: '100vh',}}>
          <SideMenu/>
        </Sider>
        <Layout className={{ marginLeft: 200 }} style={{height:'100vh'}}>
          <Header style={{ padding: 0, background: '#fff'}}>
            <SearchBox fetchData={this.fetchData.bind(this)}/>
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              <Main
                user_data={this.state.user_data}
                events_data={this.state.events_data}
                followers_data={this.state.followers_data}
                following_data={this.state.following_data}  
                repo_data={this.state.repo_data}
              />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default App;
