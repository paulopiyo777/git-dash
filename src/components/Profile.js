import React, { Component } from 'react';
import { Card, Col, Row, List, Avatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';


class Profile extends Component {
    render() {
        const { user_data, events_data, followers_data, following_data } = this.props;

        return(
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
                <Col span={8}>
                    <Card title="Recent Activities">
                        <List
                            itemLayout="horizontal"
                            pagination={{pageSize: 5}} // if there are more than 5 items other items go to next page
                            dataSource={events_data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                title={item.type}
                                description={item.repo.name}
                                />
                            </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Following">
                    <List
                        itemLayout="horizontal"
                        pagination={{pageSize: 5}} // if there are more than 5 items other items go to next page
                        dataSource={following_data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar src={item.avatar_url} />}
                            title={<a href={item.html_url}>{item.login}</a>}
                            />
                        </List.Item>
                        )}
                      />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Followers">
                        <List
                            itemLayout="horizontal"
                            pagination={{pageSize: 5}} // if there are more than 5 items other items go to next page
                            dataSource={followers_data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={item.avatar_url} />}
                                title={<a href={item.html_url}>{item.login}</a>}
                                />
                            </List.Item>
                          )}
                        />
                    </Card>
                </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;