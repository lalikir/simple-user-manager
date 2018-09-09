import React from 'react';

class ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseError: false,
            users: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        console.log(this.state.value)
        await fetch('/list-users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            const isError = res.status !== 200
            console.log(res)
            this.setState({responseError: isError, })
            return res.json()
        })
            .then(json => json.map((item) => {console.log(item); return this.state.users.push(item)}), this.state.users);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input className={'btn btn-primary'} type="submit" value="List users" />
                </div>
                {this.state.users}
            </form>
        );
    }
}

export default ListUsers;