import React, { Component } from "react";
import {Provider } from "react-redux";
import { Font, AppLoading, Expo } from 'expo';
import Router from './src/config/routes'
import store from './src/redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./src/assets/fonts/Roboto-Black.ttf')},
            {RobotoBold: require('./src/assets/fonts/Roboto-Bold.ttf')},
            {Roboto_medium: require('./src/assets/fonts/Roboto-Medium.ttf')},
            {RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf')},
            {RobotoLight: require('./src/assets/fonts/Roboto-Light.ttf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}
