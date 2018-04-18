import React from "react";
import {AppRegistry, Alert, AsyncStorage, ImageBackground, Image, Linking, View} from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text } from "native-base";
import { StackNavigator } from "react-navigation";
import styles from "../home/scenes/Home/styles";
import {actions as auth} from "../auth/index"
const {signOut, createUser} = auth;
import {connect} from 'react-redux';
import Form from "../auth/components/Form"

const error = {
    general: "",
    username: "",
    key: "",
    token: ""
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            user: [],
            error: "",
            loading: true,
            fields:[],
        };
        this.onSignOut = this.onSignOut.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessComplete = this.onSuccessComplete.bind(this);
        this.onError = this.onError.bind(this);
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

    onSubmit(data) {
        this.setState({error: error}); //clear out error messages

        //attach user id
        let user = this.state.user;

        data['uid'] = user.uid;

        this.props.createUser(data, this.onSuccessComplete, this.onErrorComplete)
    }

    onSuccessComplete() {
        Alert.alert('Profil modifié !');
    }

    onErrorComplete() {
        Alert.alert('Erreur dans l\'update');
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData,
                loading: false,
                fields:[{
                    key: 'username',
                    label: "Trello username",
                    placeholder: "Trello username",
                    autoFocus: false,
                    secureTextEntry: false,
                    value: userData.username,
                    type: "text"
                },
                {
                    key: 'key',
                    label: "Trello key",
                    placeholder: "Trello key",
                    autoFocus: false,
                    secureTextEntry: false,
                    value: userData.key,
                    type: "text"
                },
                {
                    key: 'token',
                    label: "Trello token",
                    placeholder: "Trello token",
                    autoFocus: false,
                    secureTextEntry: false,
                    value: userData.token,
                    type: "text"
                }]

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

    renderForm(){
        if(this.state.fields.length !== 0){
            return <Form fields={this.state.fields}
                  showLabel={true}
                  onSubmit={this.onSubmit}
                  buttonTitle={"UPDATE"}
                  error={this.state.error}
            />
        }
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
                    <ImageBackground
                        source={{
                            uri: "https://images.pexels.com/photos/371633/pexels-photo-371633.jpeg?auto=compress&cs=tinysrgb&h=350"
                        }}
                        style={{
                            height: 150,
                            alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Image rounded
                               square
                               style={{ height: 80, width: 80, borderRadius: 50 }}
                               source={{
                                   uri: "http://trello-avatars.s3.amazonaws.com/"+this.state.profile.uploadedAvatarHash+"/50.png"
                               }}
                        />
                        <Text style={{fontSize: 20}}>{this.state.profile.fullName}</Text>

                    </ImageBackground>
                    {this.renderForm()}
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
export default connect(null, {signOut, createUser})(Profile);
