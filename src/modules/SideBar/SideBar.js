import React from "react";
import {AppRegistry, Image, StatusBar, ImageBackground, Alert, AsyncStorage} from "react-native";
import { Container, Content, Text, List, ListItem, Button } from "native-base";

const routes = ["Boards", "Profile", "Parameters"];

export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            user: []
        };
    }
    static navigationOptions = { title: 'Sidebar', header: null };

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
                <Content>

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

                    <List
                        dataArray={routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(data)}>
                                    <Text>{data}</Text>
                                </ListItem>
                            );
                        }}
                    />

                </Content>
            </Container>
        );
    }
}

