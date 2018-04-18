import React from "react";
import {AppRegistry, View, StatusBar, AsyncStorage} from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text, List, ListItem, Thumbnail } from "native-base";
export default class Members extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            boardId: '',
            members: [],
        };

    }
    static navigationOptions = { title: 'Members', header: null };

    componentDidMount(){
        AsyncStorage.getItem('boardId').then((boardId) => {
            this.setState({
                boardId: boardId,
            }, this.getMembers);
        });
    }

    getMembers(){
        fetch('https://api.trello.com/1/boards/'+this.state.boardId+'/members?key=a5ca4d49815c59241b3c4784d33e4012&token=4da566edfa51e5d5ee524b3de7e93e5a9e5cd3b06d0adc5685a5720c84df23e5')
            .then(res => this.handleErrors(res))
            .then(res => res.json())
            .then(res => this.setState({ members: res}))
            .catch(res => console.log(res));
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }

    render() {
        const { navigate } = this.props.navigation;

        let members = this.state.members.map((member) =>
            <ListItem avatar key={member.id}>
                <Left>
                    <Thumbnail source={{ uri: 'https://pbs.twimg.com/profile_images/513489380435312640/qozOi27n_400x400.jpeg' }} />
                </Left>
                <Body>
                <Text>{member.fullName}</Text>
                <Text note>{member.username}</Text>
                </Body>
            </ListItem>
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
                    <Title>Members</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        {members}
                    </List>
                </Content>
            </Container>
        );
    }
}
