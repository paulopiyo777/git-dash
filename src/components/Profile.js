// profile template file
import React, { Component } from 'react';
import { Card, Col, Row, List, Avatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';


class Profile extends Component {
    // return status logs of user actions on GitHub
    renderEventItems(item) {
        return (
            <List.Item>
                <List.Item.Meta
                    title={item.type}
                    description={item.repo.name}
                />
            </List.Item>
        )
    }

    // return user information based on parameters passed
    renderUserItems(item) {
        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar_url} />}
                    title={<a href={item.html_url}>{item.login}</a>}
                    />
            </List.Item>
        )
    }

    // helper function that assists in ordering tables
    renderColumn(title, dataSource, renderItemFunc) {
        return (
            <Col span={8}>
                <Card title={title}>
                    <List
                        itemLayout="horizontal"
                        pagination={{pageSize: 5}} // if there are more than 5 items other items go to next page
                        dataSource={dataSource}
                        renderItem={renderItemFunc}
                    />
                </Card>
            </Col>
        );
    }

    render() {
        const { user_data, events_data, followers_data, following_data } = this.props;

        return(
            // if user data exists, render user information else render "spinning" icon to show loading status
            <div className="sit-wrapper">
                {user_data ?
                <div>
                    <div className="name-container">
                        <h1>{user_data.name}</h1>
                        <Avatar src={user_data.avatar_url}  size="large" icon={<UserOutlined />} />
                        {/* <h1>Paul Opiyo</h1> */}
                    </div>
                    <p>{user_data.bio}</p>
                </div>
                :
                <div style={{textAlign:'center', padding: '50px'}}>
                    <Spin />
                </div>}

                <Row gutter={16}>
                    {this.renderColumn("Recent Activities", events_data, this.renderEventItems)}
                    {this.renderColumn("Following", following_data, this.renderUserItems)}
                    {this.renderColumn("Followers", followers_data, this.renderUserItems)}
                </Row>
            </div>
        );
    }
}

export default Profile;