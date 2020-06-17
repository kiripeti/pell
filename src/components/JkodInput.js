import React, {Component} from 'react';

class JkodInput extends Component {
    render(props) {
      return (
        <div style={{width:'80%', margin:'auto', background:'#e1e1e1', border:'1px solid #d1d1d1', padding:0, paddingTop:5, paddingBottom:5}}>
          <div style={{paddingLeft:20, fontSize:'10pt'}}>
            Azonosító kód:&nbsp;
            <input value={this.props.jkod} onChange={(event) => this.props.onChange(event.target.value)} type="text" size="10" style={{paddingLeft:5}} />
            <input type="button" value=" Ok " onClick={this.props.onClick} className="button" />
          </div>
        </div>
      );
    }
}

export default JkodInput;
