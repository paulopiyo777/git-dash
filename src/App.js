import React, { Component } from 'react';
import Profile from './components/Profile';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  CodeOutlined,
} from '@ant-design/icons';

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
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{marginTop: '80px'}}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<CodeOutlined />}>
              Repositories
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className={{ marginLeft: 200 }} style={{height:'100vh'}}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              <Profile 
                user_data={this.state.user_data}
                events_data={this.state.events_data}
                followers_data={this.state.followers_data}
                following_data={this.state.following_data}
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
