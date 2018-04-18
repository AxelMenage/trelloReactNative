import React from 'react';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';
import Home from '../modules/home/scenes/Home';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";
import { StackNavigator } from 'react-navigation';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((isLoggedIn) => {
            _this.setState({isReady: true, isLoggedIn});
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        if(this.state.isLoggedIn){
            return <Home/>
        }

        else {
            return <RootStack/>
        }
    }
}

const RootStack = StackNavigator(
    {
        Welcome: {
            screen: Welcome,
            header: { visible:false }
        },
        Login: {
            screen: Login,
        },
        Register: {
            screen: Register,
        },
        ForgotPassword: {
            screen: ForgotPassword,
        },
        CompleteProfile: {
            screen: CompleteProfile,
        },
        Home: {
            screen: Home,
        },
    },
    {
        initialRouteName: 'Welcome',
    },
    {
        headerMode: 'screen'
    }
);
