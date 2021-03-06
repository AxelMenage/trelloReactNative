import React from 'react';

import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { register } = auth;

import Form from "../../components/Form"

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
    },
    {
        key: 'confirm_password',
        label: "Confirm Password",
        placeholder: "Confirm Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "confirm_password"
    }
];

const error = {
    general: "",
    email: "",
    password: "",
    confirm_password: ""
}

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error,
            navig: null
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    static navigationOptions = { title: 'Register' };

    componentDidMount(){
        const { params } = this.props.navigation.state;
        const navig = params ? params.navig : null;
        this.setState({
            navig: navig
        });
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
        this.state.navig.navigate('CompleteProfile', {theuser: user, navig: this.state.navig})
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
                  buttonTitle={"SIGN UP"}
                  error={this.state.error}/>
        );
    }
}

export default connect(null, { register })(Register);
