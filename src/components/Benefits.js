import React, {Component} from 'react';

class Benefits extends Component {
  handleChange = (event) => this.props.onChange(event.target.value);

  renderGroup = (groupName) => {
    const group = this.props.benefits.filter( (benefit) => benefit.group === groupName );

    let rows = [];
    for (var i = 0; i < group.length; i=i+3) {
      rows.push((
        <tr key={groupName+i}>
          <td className="cell_text">
            <label>
              <input
                type="checkbox"
                value={group[i].name}
                checked={this.props.selectedBenefits[group[i].name]}
                onChange={this.handleChange} />
              {' '+group[i].label}
            </label>
          </td>
          {
            group[i+1] !== undefined &&
            <td className="cell_text">
              <label>
                <input
                  type="checkbox"
                  value={group[i+1].name}
                  checked={this.props.selectedBenefits[group[i+1].name]}
                  onChange={this.handleChange} />
                {' '+group[i+1].label}
              </label>
            </td>
          }
          {
            group[i+2] !== undefined &&
            <td className="cell_text">
              <label>
                <input
                  type="checkbox"
                  value={group[i+2].name}
                  checked={this.props.selectedBenefits[group[i+2].name]}
                  onChange={this.handleChange} />
                {' '+group[i+2].label}
              </label>
            </td>
          }
        </tr>
      ));
    }

    return (
      <div key={groupName}>
        <div style={{paddingLeft:20, paddingBottom:8, fontSize:13, textTransform:'uppercase', paddingTop: 10}} >
          {groupName}
        </div>
        <div style={{background:'#fff', padding:5, borderTop:'1px solid #d1d1d1', margin:'0px auto', horizontalAlign:'center'}} >
          <table width="100%" border="0" cellPadding="8" >
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="benefit_container" style={{position:'relative', top:150, width:'80%', margin:'auto', background:'#e1e1e1', border:'1px solid #d1d1d1', padding:0, paddingBottom:0}} >
        {
          this.props.benefits.map( (benefit) => benefit.group )
                             .filter( (group, index, groups) => groups.indexOf(group) === index )
                             .map(this.renderGroup)
        }
      </div>
    );
  }
}

export default Benefits;
