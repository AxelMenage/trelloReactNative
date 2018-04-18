import React from "react";
import {AppRegistry, Alert, AsyncStorage} from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import styles from "../home/scenes/Home/styles";
import {actions as auth} from "../auth/index"
const {signOut} = auth;
import {connect} from 'react-redux';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            user: [],
            error: "",
            loading: true
        };
        this.onSignOut = this.onSignOut.bind(this);
    }
    static navigationOptions = { title: 'Profile', header: null };

    onSignOut() {
        this.props.signOut(this.onSuccess.bind(this), this.onError.bind(this))
    }

    onSuccess() {
        this.props.navigation.navigate("Welcome");
    }

    onError(error) {
        Alert.alert('Oops!', error.message);
    }


    componentDidMount(){
        AsyncStorage.getItem('user').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData,
                loading: false
            }, this.getProfile);
        });

    }

    getProfile(){
        fetch('https://api.trello.com/1/members/'+this.state.user.username+'?key='+this.state.user.key+'&token='+this.state.user.token)
            .then(res => this.handleErrors(res))
            .then(res => res.json())
            .then(res => this.setState({ profile: res}))
            .catch(res => console.log(res));
    }


    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>My profile</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Button
                        title="LOGOUT"
                        danger
                        style={{fontSize: 20}}
                        onPress={this.onSignOut}><Text> LOGOUT </Text></Button>
                </Content>
            </Container>
        );
    }
}
export default connect(null, {signOut})(Profile);
