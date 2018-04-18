import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Body, Content,Text, Card, CardItem } from "native-base";
import {Button, SocialIcon, Divider} from 'react-native-elements'
import {connect} from 'react-redux';

import {actions as auth} from "../../index"
const {} = auth;

import styles from "./styles"

class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    static navigationOptions = { title: 'Welcome', header: null };

    render() {
        return (
            <View style={styles.container}>
                <Content>
                    <View style={styles.topContainer}>
                        <Image style={styles.image} source={{uri: "https://upload.wikimedia.org/wikipedia/fr/6/68/Logo_Trello.png"}}/>
                        <Text style={styles.title}>Mobile Version</Text>
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={[styles.buttonContainer]}>
                            <Button
                                raised
                                borderRadius={4}
                                title={'SIGN IN WITH EMAIL'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={() => this.props.navigation.navigate('Login', {navig: this.props.navigation})}/>

                            <View style={styles.orContainer}>
                                <Divider style={styles.divider}/>
                                <Text style={styles.orText}>
                                    Or
                                </Text>
                            </View>
                            <Button
                                raised
                                borderRadius={4}
                                title={'SIGN UP'}
                                containerViewStyle={[styles.containerView]}
                                buttonStyle={[styles.button]}
                                textStyle={styles.buttonText}
                                onPress={() => this.props.navigation.navigate('Register', {navig: this.props.navigation})}/>
                        </View>
                    </View>
                </Content>
            </View>
        );
    }
}

export default connect(null, {})(Welcome);
