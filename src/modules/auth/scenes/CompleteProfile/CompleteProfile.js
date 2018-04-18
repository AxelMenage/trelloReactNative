import React from 'react';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"
const { createUser } = auth;
import {Linking, View, Text, AsyncStorage} from 'react-native'

import Form from "../../components/Form"
import styles from "../Welcome/styles";

const fields = [
    {
        key: 'username',
        label: "Trello username",
        placeholder: "Trello username",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'key',
        label: "Trello key",
        placeholder: "Trello key",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },
    {
        key: 'token',
        label: "Trello token",
        placeholder: "Trello token",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "text"
    },

];

const error = {
    general: "",
    username: "",
    key: "",
    token: ""
}

class CompleteProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error,
            navig: null,
            user: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    static navigationOptions = { title: 'Complete profile' };

    componentDidMount(){
        const { params } = this.props.navigation.state;
        const navig = params ? params.navig : null;
        const theuser = params ? params.theuser : null;

        this.setState({
            navig: navig,
            user: theuser
        });
    }

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        //attach user id
        let user = this.state.user;

        data['uid'] = user.uid;

        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        this.state.navig.navigate('Home');
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
        if(this.state.user.uid != null){
        return (
                <View style={styles.container}>
                    <Form fields={fields}
                          showLabel={false}
                          onSubmit={this.onSubmit}
                          buttonTitle={"SAVE"}
                          error={this.state.error}
                    />

                    <Text>Log in to Trello and visit <Text onPress={() => Linking.openURL('https://trello.com/app-key')} style={{color:"#0081cd", textDecorationLine: "underline"}}>https://trello.com/app-key</Text> to obtain your key & token</Text>
                </View>


        )}
        return <View/>
    }
}

export default connect(null, { createUser })(CompleteProfile);
