import React, { Component } from "react";
import Home from "./Home";
import MainScreenNavigator from "../../../BoardScreen/index.js";
import Profile from "../../../ProfileScreen/index.js";
import SideBar from "../../../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
    {
        Boards: { screen: Home },
        Board: { screen: MainScreenNavigator },
        Profile: { screen: Profile }
    },
    {
        contentComponent: props => <SideBar {...props} />
    },
    {
        header: null
    }
);
export default HomeScreenRouter;
