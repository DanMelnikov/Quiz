import React from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends React.Component {
    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        });
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        });
    }

    render() {
        return (
            <div className={classes.Layout}>

                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                    isLogin={this.props.isLogin}
                />

                <MenuToggle 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />

                <main>
                    { this.props.children }
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLogin: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);