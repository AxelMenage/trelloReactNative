import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";



export default class Chat extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            boardId: '',
        };

    }

    static navigationOptions = { title: 'Chat', header: null };

    sendMessage(){

    }

    render() {
        const { navigate } = this.props.navigation;
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
                    <Title>Chat</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>

                    <Input
                           submitAction={this.sendMessage}
                           ref="input"
                           placeholder="New message..." />

                </Content>
            </Container>
        );
    }
}
