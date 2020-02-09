import * as React from "react";
import UserService from "../../services/UserService";
import {PopupContext} from "../../contexts/PopupContext";
import {connect} from "react-redux";
import {setUser} from "../../action-creator/user/setUser";

export class LoginForm extends React.PureComponent {
    static contextType = PopupContext;
    state = {
        username: "",
        password: ""
    };

    submit = async (e) => {
        e.preventDefault();
        const response = await UserService.auth(this.state);
        if (response.ok) {
            let data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userFavorite', JSON.stringify(data.favorites));
            this.props.setUser(data.user);
            //fermer popup
            this.context.popup.show(null, null);
        } else {
            //msg d'erreur
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" id="username" className="form-control" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" id="password" className="form-control" onChange={this.handleChange}/>
                    </div>

                    <button className="btn btn-primary">Connexion</button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUser(user))
    }
};

export const SmartLoginForm = connect(undefined, mapDispatchToProps)(LoginForm)