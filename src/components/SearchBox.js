// search box template file
import React, { Component } from 'react';
import { Input } from 'antd';

const { Search } = Input;

class SearchBox extends Component {
    render() {
        return (
            <Search
              style= {{
                width: '300px',
                marginLeft: '20px',
                padding: '15px',
              }}
              placeholder="github username"
              onSearch={value => this.props.fetchData(value)}
              enterButton
            />
        );
    }
}

export default SearchBox;