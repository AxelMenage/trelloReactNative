import React from "react";
import {AppRegistry, View, StatusBar, Modal, TouchableHighlight, AsyncStorage} from "react-native";
import { Container, Header, Content, Form, Item, Input, Label, Picker, Button, Text, Title, Left, Right, List, ListItem, Footer, Body, Icon } from 'native-base';
export default class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            lists: [],
            boardId: '',
            boardName: '',
            modalVisible: false,
            listsCards: [],
            user: [],
            loading: true
        }
    }
    static navigationOptions = { title: 'Tasks', header: null };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount(){
        AsyncStorage.getItem('user').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData,
                loading: false
            }, this.setBoardInfos);
        });

    }

    setBoardInfos(){
        const { params } = this.props.navigation.state;
        const boardId = params ? params.boardId : null;
        const boardName = params ? params.boardName : null;
        this.setState({
            boardId: boardId, boardName: boardName
        }, () => {
            this.getCards();
        });
    }

    getCards(){
        fetch('https://api.trello.com/1/boards/'+this.state.boardId+'/lists?key='+this.state.user.key+'&token='+this.state.user.token)
            .then(res => this.handleErrors(res))
            .then(res => res.json())
            .then(res => this.setState({ lists: res}))
            .then(()=>{
                fetch('https://api.trello.com/1/boards/'+this.state.boardId+'/cards/?key='+this.state.user.key+'&token='+this.state.user.token)
                    .then(res => this.handleErrors(res))
                    .then(res => res.json())
                    .then(res => this.setState({ cards: res}))
                    .then(() => {
                        this.setFinalCardsList()
                    })
                    .then(
                        () => AsyncStorage.setItem('boardId', this.state.boardId)
                    )
                    .catch(res => console.log(res));
            })
            .catch(res => console.log(res));
    }

    setFinalCardsList(){
        let finalList = [];
        for(let i = 0; i < this.state.lists.length; i++){
            finalList.push(this.state.lists[i]);
            for(let j = 0; j < this.state.cards.length; j++){
                if(this.state.cards[j].idList == this.state.lists[i].id){
                    finalList.push(this.state.cards[j]);
                }
            }
        }
        this.setState({
            listsCards: finalList
        })
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.status);
        }
        return response;
    }

    render() {

        let cards = this.state.listsCards.map((item => {
            return item.idList != null ? <ListItem key={item.id}><Text>{item.name}</Text></ListItem> : <ListItem itemHeader key={item.id}><Text>{item.name}</Text></ListItem>

        }));

        let formLists = this.state.lists.map((item) =>
            <Item label={item.name} value={item.id} key={item.id} />
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
                    <Title>{this.state.boardName}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {
                                this.setModalVisible(true);
                            }}>
                            <Icon name="add" />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={{marginTop: 22}}>
                            <View>
                                <Form>
                                    <Item floatingLabel>
                                        <Label>Name</Label>
                                        <Input onChangeText={(name) => this.props.changeTaskName(name)}/>
                                    </Item>
                                    <Item floatingLabel>
                                        <Label>Description</Label>
                                        <Input onChangeText={(desc) => this.props.changeTaskDesc(desc)}/>
                                    </Item>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="List"
                                    >
                                        {formLists}
                                    </Picker>
                                    <Button block primary><Text> Ajouter </Text></Button>
                                    <Button block light onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}><Text> Annuler </Text></Button>
                                </Form>
                            </View>
                        </View>
                    </Modal>
                    <List>
                        {cards}
                    </List>
                </Content>
            </Container>
        );
    }
}
