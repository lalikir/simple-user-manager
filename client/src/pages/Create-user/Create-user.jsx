import React from 'react';
import ClassNames from 'classnames'

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            responseText: '',
            responseError: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
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
            body: JSON.stringify({userName: this.state.value})
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
                        <label htmlFor="usr">Name:</label>
                        <input type="text" className="form-control" id="usr"  value={this.state.value} onChange={this.handleChange} />
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