import React, { Component } from "react";
import Tasks from "./Tasks.js";
import Members from "./Members.js";
import Chat from "./Chat.js";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
export default (MainScreenNavigator = TabNavigator(
    {
        Tasks: { screen: Tasks },
        Members: { screen: Members },
        Chat: { screen: Chat }
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("Tasks")}>
                            <Icon name="bookmarks" />
                            <Text>Tasks</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("Members")}>
                            <Icon name="people" />
                            <Text>Members</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("Chat")}>
                            <Icon name="git-branch" />
                            <Text>Chat</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
));
