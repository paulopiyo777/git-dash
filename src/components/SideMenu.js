import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, CodeOutlined } from '@ant-design/icons';

class SideMenu extends Component {
    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} style={{marginTop: '60px'}}>
            <Menu.Item key="1" >
              <Link to='/'>
                {<UserOutlined />}
                <span className="nav-text">Profile</span>
                {/* Profile */}
              </Link>
            </Menu.Item>
            <Menu.Item key="2" >
              <Link to='/repo'>
                {<CodeOutlined />}
                <span className="nav-text">Repositories</span>
                {/* Repositories */}
              </Link>
            </Menu.Item>
          </Menu>
        );
    }
}

export default SideMenu;