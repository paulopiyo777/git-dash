import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a href={record.url}>{text}</a>,
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },];


class Repositories extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.props.repo_data.map(repo => ({
                    key: repo.id,
                    name: repo.name,
                    owner: repo.owner.login,
                    description: repo.description,
                    url: repo.html_url
                }))} />
            </div>
        )
    }
}

export default Repositories;