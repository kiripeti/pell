import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user:'',
        pw:'',
      };
    }

    onChange(elem) {
      let component = this;
      return function(event) {
        component.setState({[elem]: event.target.value});
      }
    }

    render(props) {
      return (
        <div style={{paddingLeft:20, fontSize:'10pt'}}>
          {'Felhasználónév: '}
          <input value={this.state.user} onChange={this.onChange('user')} type="text" size="10" style={{paddingLeft:5}} />
          {' Jelszó: '}
          <input value={this.state.pw} onChange={this.onChange('pw')} type="password" size="10" style={{paddingLeft:5}} />
          <input type="button" value=" Bejelentkezés " onClick={() => this.props.login(this.state.user, this.state.pw)} className="button" />
        </div>
      );
    }
}

export default Login;
