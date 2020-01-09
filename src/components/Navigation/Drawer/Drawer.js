import React from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

class Drawer extends React.Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            );
        })
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        const links = [
            {label: 'Выбор теста', to: '/', exact: true}
        ];

        if (this.props.isLogin) {
            links.push({label: 'Создать тест', to: '/quiz-creator', exact: false});
            links.push({label: 'Выйти', to: '/logout', exact: false});
        } else {
            links.push({label: 'Авторизация', to: '/auth', exact: false})
        }

        return (
            <React.Fragment>
                <nav 
                    className={cls.join(' ')}
                >
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    }
}

export default Drawer;