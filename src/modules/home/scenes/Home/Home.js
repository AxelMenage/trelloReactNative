import React from 'react';
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import {connect} from 'react-redux';

import { theme } from "../../../auth/index"
const { color } = theme;

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            boards: [],
            user: []
        };
    }

    static navigationOptions = { title: 'Home', header: null };

    componentWillMount() {
        AsyncStorage.removeItem('boardId');
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData,
                loading: false
            }, this.getBoards);
        });

    }

    getBoards(){
        fetch('https://api.trello.com/1/members/'+this.state.user.username+'/boards?key='+this.state.user.key+'&token='+this.state.user.token)
            .then(res => this.handleErrors(res))
            .then(res => res.json())
            .then(res => this.setState({ boards: res}))
            .catch(res => console.log(res));
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }

    render() {

        let boards = this.state.boards.map((board) =>
            <Button full primary
                    style={{ marginTop: 10 }}
                    onPress={() => this.props.navigation.navigate("Tasks", { boardId: board.id, boardName: board.name })} key={board.id}>
                <Text>{board.name}</Text>
            </Button>
        );

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
                    <Title>My boards</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    {boards}
                </Content>
            </Container>
        );
    }
}
