import React from 'react';
import ClassNames from 'classnames'

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            responseText: '',
            responseError: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.id)
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        console.log(this.state.value)
        await fetch('/create-user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: this.state.userName, userEmail: this.state.email})
        }).then(res => {
            const isError = res.status !== 200
            this.setState({responseError: isError, })
            return res.json()
        })
            .then(json => this.setState({ responseText: json.message }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <div className="form-group row">
                        <label htmlFor="userName">Username:</label>
                        <input type="text" className="form-control" id="userName" placeholder="Your username" value={this.state.userName} onChange={this.handleChange} />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" className="form-control" id="email" placeholder="test@example.com" value={this.state.email} onChange={this.handleChange} />
                    </div>
                </label>
                <div>
                    <input className={'btn btn-primary'} type="submit" value="Submit" />
                </div>
                <div>
                    {this.state.responseText && <p className={ClassNames('alert', {'alert-success': !this.state.responseError }, {'alert-danger': this.state.responseError})}> {this.state.responseText}</p> }
                </div>

            </form>
        );
    }
}

export default CreateUser;