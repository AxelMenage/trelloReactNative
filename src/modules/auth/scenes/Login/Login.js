import React from 'react';

import {connect} from 'react-redux';

import {actions as auth} from "../../index"

import Form from "../../components/Form"

const {login} = auth;

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error,
            navig: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }
    static navigationOptions = { title: 'Login' };
    componentDidMount(){
        const { params } = this.props.navigation.state;
        const navig = params ? params.navig : null;
        this.setState({
            navig: navig
        });
    }

    onForgotPassword() {
        if (this.state.navig !== undefined)
            this.state.navig.navigate('ForgotPassword')
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages
        this.props.login(data, this.onSuccess, this.onError)
    }

    onSuccess({exists, user}) {
        if (exists) this.state.navig.navigate('Home');
        else this.state.navig.navigate('CompleteProfile', {theuser: user, navig: this.state.navig})
    }

    onError(error) {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({error: errObj});
    }

    render() {
        return (
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"LOG IN"}
                  error={this.state.error}
                  onForgotPassword={this.onForgotPassword.bind(this)}/>
        );
    }
}

export default connect(null, {login})(Login);
