import React, { Component } from 'react';
import { SAS } from '../../js/utils';
import Select from '../FormElements/Select';
import Input from '../FormElements/Input';
import DatePicker from '../FormElements/DatePicker';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      eventParams: [],
      eventBenefits: [],
      selectedEvent: 'JOGSZ',
      benefitList: []
    };

    this.sas = new SAS();
  }

  componentDidMount = () =>
    this.sas.call({
      program: 'getEvents',
      isDebug: this.props.isDebug,
      preprocess: () => this.setState(() => ({
        isLoading: true,
        loadingMessage: 'Betöltés'
      })),
      success: (res) => {
        this.setState(() => ({
          events: res.events,
          eventParams: res.eventParams,
          eventBenefits: res.eventBenefits
        }));
        this.sas.call({
          program: 'getBenefits',
          isDebug: this.props.isDebug,
          preprocess: () => this.setState(() => ({
            isLoading: true,
            loadingMessage: 'Betöltés'
          })),
          success: (res) => {
            this.setState(() => ({
              benefits: res.benefits,
              benefitParams: res.benefitParams
            }));
          },
          postprocess: () => {
            this.setState(() => ({
              isLoading: false
            }));
          }
        });
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

  addEvent = () => {
    const eventList = [
      ...this.props.eventList,
      {
        event_cd: this.state.selectedEvent,
        event_params: this.state.eventParams
          .filter((param) => (param.EVENT_CD === this.state.selectedEvent))
          .reduce((prev, param) => ({
            ...prev,
            [param.NAME]: ''
          }), {}),
        event_params_descriptor: this.state.eventParams
          .filter((param) => (param.EVENT_CD === this.state.selectedEvent))
      }
    ];

    const benefitList = eventList
      .map(event => this.state.eventBenefits.filter(eb => eb.EVENT_CD === event.event_cd).map(eb => eb.BENEFIT_CD))
      .flat()
      .filter((elem, index, array) => array.indexOf(elem) === index);

    this.setState({ benefitList: benefitList });
    this.props.eventListUpdate({ eventList: eventList, benefitList: benefitList });
  }

  removeEvent = (index) => {
    const eventList = this.props.eventList.slice();
    eventList.splice(index, 1);

    const benefitList = eventList
      .map(event => this.state.eventBenefits.filter(eb => eb.EVENT_CD === event.event_cd).map(eb => eb.BENEFIT_CD))
      .flat()
      .filter((elem, index, array) => array.indexOf(elem) === index);

    this.setState({ benefitList: benefitList });
    this.props.eventListUpdate({ eventList: eventList, benefitList: benefitList });
  }

  updateEventList = (index, name, value) => {
    let eventList = this.props.eventList.slice();
    eventList[index]['event_params'][name] = value;
    this.props.eventListUpdate({ eventList: eventList, benefitList: this.state.benefitList });
  }

  renderParam = (event, index) => {
    return (param) => {
      if (param.NAME.indexOf('_FLG') > -1 && param.TYPE !== 'S') {
        param.TYPE = 'FL';
      }

      let input = null;

      switch (param.TYPE) {
        case 'N':
          input = (
            <Input
              type="N"
              name={param.NAME}
              className="cell_input"
              value={event.event_params[param.NAME] != null ? event.event_params[param.NAME] : ''}
              onChange={(value) => this.updateEventList(index, param.NAME, value)} />
          );
          break;
        case 'F':
          input = (
            <Input
              type="F"
              name={param.NAME}
              className="cell_input"
              value={event.event_params[param.NAME] != null ? event.event_params[param.NAME] : ''}
              onChange={(value) => this.updateEventList(index, param.NAME, value)} />
          );
          break;
        case 'S':
          const pairs = param.OPTIONS.split(';');
          input = (
            <select
              name={param.NAME}
              className="combobox"
              size="1"
              value={event.event_params[param.NAME] ? event.event_params[param.NAME] : ''}
              onChange={(event) => this.updateEventList(index, param.NAME, event.target.value)} >
              <option></option>
              {pairs.map((pair, index) => (
                <option key={index} value={pair.split(':')[0]}> {pair.split(':')[1]} </option>
              ))}
            </select>
          );
          if (pairs.length > 1) break;
        case 'C':
          input = (
            <Input
              type="C"
              name={param.NAME}
              className="cell_input"
              value={event.event_params[param.NAME] ? event.event_params[param.NAME] : ''}
              onChange={(value) => this.updateEventList(index, param.NAME, value)} />
          );
          break;
        case 'D':
          input = (
            <DatePicker
              name={param.NAME}
              className="cell_input"
              date={event.event_params[param.NAME] ? event.event_params[param.NAME] : ''}
              onChange={(value) => this.updateEventList(index, param.NAME, value[param.NAME])} />
          );
          break;
        case 'FL':
          input = (
            <select
              name={param.NAME}
              className="combobox"
              size="1"
              value={event.event_params[param.NAME] ? event.event_params[param.NAME] : ''}
              onChange={(event) => this.updateEventList(index, param.NAME, event.target.value)} >
              <option></option>
              <option value="1">Igen</option>
              <option value="0">Nem</option>
            </select>
          );
          break;
        default:
          input = null;
      }

      return (
        <tr key={param.NAME}>
          <td className="cell_property_fix">{param.LABEL}:</td>
          <td className="cell_value">
            {input}
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div id="benefit_container" style={{ position: 'relative', top: 150, width: '80%', margin: 'auto', background: '#e1e1e1', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
        <div>
          <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 13, textTransform: 'uppercase', paddingTop: 10 }} >
            Életsemények
          </div>
          <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center' }} >
            <table width="100%" border="0" cellPadding="8" >
              <tbody>
                <tr>
                  <td>
                    <Select
                      name="event"
                      className="combobox"
                      value={this.state.selectedEvent}
                      onChange={(value) => this.setState(() => ({ selectedEvent: value }))}
                      options={this.state.events.reduce((prev, event) => ({
                        ...prev, ...{ [event.EVENT_CD]: event.EVENT_DESC }
                      }), {})} />
                    <input type="button" className="button" style={{ marginLeft: 10 }} value=" Hozzáadás " onClick={this.addEvent} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {
          this.props.eventList.map((event, index) => (
            <div key={event.event_cd + index}>
              <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 13, textTransform: 'uppercase', paddingTop: 10 }} >
                {index + 1}. Életesemény: {this.state.events.filter((e) => e.EVENT_CD === event.event_cd)[0].EVENT_DESC}
                <input type="button" className="button" style={{ marginLeft: 10 }} value=" Törlés " onClick={() => this.removeEvent(index)} />
              </div>
              <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center' }} >
                <table width="100%" border="0" cellPadding="8" >
                  <tbody>
                    <tr>
                      <td align="center">
                        <table border="0" cellPadding="8" >
                          <tbody>
                            {event.event_params_descriptor.map(this.renderParam(event, index))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Events;
