import React, {Component} from 'react';

class Benefits extends Component {
  handleChange = (event) => this.props.onChange(event.target.value);

  renderGroup = (groupName) => {
    const group = this.props.benefits.filter( (benefit) => benefit.GROUP === groupName );

    let rows = [];
    const elemsInRow=3;
    for (var i = 0; i < group.length; i=i+elemsInRow) {
      rows.push((
        <tr key={groupName+i}>
          {(new Array(elemsInRow)).fill(0).map((e, i) => i).map(j => i+j).filter(j => j<group.length).map(j => (
            <td key={groupName+j} className="cell_text" style={{width: ''+Math.round(100/elemsInRow)+'%'}}>
              <label>
                <input
                  type="checkbox"
                  value={group[j].ELLATAS_KOD}
                  checked={this.props.selectedBenefits.indexOf(group[j].ELLATAS_KOD) > -1}
                  onChange={this.handleChange} />
                {' '+group[j].ELLATAS_NEV}
              </label>
            </td>
          ))}
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
          this.props.benefits.map( (benefit) => benefit.GROUP )
                             .filter( (group, index, groups) => groups.indexOf(group) === index )
                             .map(this.renderGroup)
        }
      </div>
    );
  }
}

export default Benefits;
