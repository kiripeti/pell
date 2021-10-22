import React, { Component, Fragment } from 'react';
import { SAS } from '../../js/utils';
import Select from '../FormElements/Select';
import Input from '../FormElements/Input';
import DatePicker from '../FormElements/DatePicker';
import BenefitParams from '../BenefitParams';

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

  getBenefits = () =>
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

        this.props.updateNyug({
          event_cd: 'NYUG',
          event_desc: 'Nyugdíj',
          event_params: {},
          event_params_descriptor: [],
          benefits: res.benefits
            .filter(benefit => benefit.ELLATAS_KOD === 'OREGSEGI' || benefit.ELLATAS_KOD === 'NOK40' )
            .sort((b1, b2) => b1.ELLATAS_KOD < b2.ELLATAS_KOD ? -1 : 1),
          benefit_params: res.benefitParams
            .filter(param => param.ELLATAS_CD === 'OREGSEGI' || param.ELLATAS_CD === 'NOK40' )
            .filter(param => param.SCEN_FLG === 1)
            .reduce((params, param) => {
              if (param.DEFAULT) params[param.NAME] = param.DEFAULT;
              return params;
            }, {}),
          benefit_params_descriptor: res.benefitParams
            .filter(param => param.ELLATAS_CD === 'OREGSEGI' || param.ELLATAS_CD === 'NOK40' )
            .filter(param => param.SCEN_FLG === 1)
            .sort((p1, p2) => p1.ORDER < p2.ORDER ? -1 : 1),
          show_benefit_params: true
        });
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

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
        this.getBenefits();
      },
      postprocess: () => {
        this.setState(() => ({
          isLoading: false
        }));
      }
    });

  addEvent = () => {
    if (!this.state.selectedEvent) return;

    const benefits = this.state.eventBenefits
      .filter(event => event.EVENT_CD === this.state.selectedEvent)
      .map(event => event.BENEFIT_CD);

    const benefit_params_descriptor = this.state.benefitParams
      .filter(param => benefits.indexOf(param.ELLATAS_CD) > -1)
      .filter(param => param.SCEN_FLG === 1)
      .sort((p1, p2) => p1.ORDER < p2.ORDER ? -1 : 1);

    const eventList = [
      ...this.props.eventList,
      {
        event_cd: this.state.selectedEvent,
        event_desc: this.state.events.filter((e) => e.EVENT_CD === this.state.selectedEvent)[0].EVENT_DESC,
        event_params: {},
        event_params_descriptor: this.state.eventParams
          .filter((param) => (param.EVENT_CD === this.state.selectedEvent))
          .sort((p1, p2) => p1 < p2 ? -1 : 1),
        benefits: this.state.benefits
          .filter(benefit => benefits.indexOf(benefit.ELLATAS_KOD) > -1)
          .sort((b1, b2) => b1.ELLATAS_KOD < b2.ELLATAS_KOD ? -1 : 1),
        benefit_params: benefit_params_descriptor
          .reduce((params, param) => {
            if (param.DEFAULT) params[param.NAME] = param.DEFAULT;
            return params;
          }, {}),
        benefit_params_descriptor: benefit_params_descriptor,
        show_benefit_params: true
      }
    ];

    const benefitList = eventList
      .map(event => this.state.eventBenefits.filter(eb => eb.EVENT_CD === event.event_cd).map(eb => eb.BENEFIT_CD))
      .flat()
      .filter((elem, index, array) => array.indexOf(elem) === index);

    this.setState({ benefitList: benefitList });
    this.props.eventListUpdate({ eventList: eventList });
  }

  removeEvent = (index) => {
    const eventList = this.props.eventList.slice();
    eventList.splice(index, 1);

    const benefitList = eventList
      .map(event => this.state.eventBenefits.filter(eb => eb.EVENT_CD === event.event_cd).map(eb => eb.BENEFIT_CD))
      .flat()
      .filter((elem, index, array) => array.indexOf(elem) === index);

    this.setState({ benefitList: benefitList });
    this.props.eventListUpdate({ eventList: eventList });
  }

  toggleBenefitShow = (index) => {
    const eventList = this.props.eventList.slice();
    eventList[index].show_benefit_params = !eventList[index].show_benefit_params;

    this.props.eventListUpdate({ eventList: eventList });
  }

  updateEventList = (index, property, name, value) => {
    let eventList = this.props.eventList.slice();
    eventList[index][property][name] = value;
    this.props.eventListUpdate({ eventList: eventList });
  }

  setBenefitParam = (index, property) =>
    obj => {
      const key = Object.getOwnPropertyNames(obj)[0];
      this.updateEventList(index, property, key, obj[key]);
    }

  setNyugParam = (obj) => this.props.updateNyug({
    ...this.props.nyug,
    benefit_params: {
      ...this.props.nyug.benefit_params,
      ...obj
    }
  })

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
              onChange={(value) => this.updateEventList(index, 'event_params', param.NAME, value)} />
          );
          break;
        case 'F':
          input = (
            <Input
              type="F"
              name={param.NAME}
              className="cell_input"
              value={event.event_params[param.NAME] != null ? event.event_params[param.NAME] : ''}
              onChange={(value) => this.updateEventList(index, 'event_params', param.NAME, value)} />
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
              onChange={(event) => this.updateEventList(index, 'event_params', param.NAME, event.target.value)} >
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
              onChange={(value) => this.updateEventList(index, 'event_params', param.NAME, value)} />
          );
          break;
        case 'D':
          input = (
            <DatePicker
              name={param.NAME}
              className="cell_input"
              date={event.event_params[param.NAME] ? event.event_params[param.NAME] : ''}
              onChange={(value) => this.updateEventList(index, 'event_params', param.NAME, value[param.NAME])} />
          );
          break;
        case 'FL':
          input = (
            <select
              name={param.NAME}
              className="combobox"
              size="1"
              value={event.event_params[param.NAME] ? event.event_params[param.NAME] : ''}
              onChange={(event) => this.updateEventList(index, 'event_params', param.NAME, event.target.value)} >
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
      <Fragment>
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
        </div>
        {
          this.props.eventList.map((event, index) => (
            <Fragment key={index} >
              <div id="benefit_container" style={{ position: 'relative', top: 180 + index * 30, width: '80%', margin: 'auto', background: '#deb306', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
                <div key={event.event_cd + index}>
                  <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 14, textTransform: 'uppercase', paddingTop: 10 }} >
                    {index + 1}. Életesemény: {event.event_desc}
                    <input type="button" className="button" style={{ marginLeft: 10 }} value=" Törlés " onClick={() => this.removeEvent(index)} />
                    {
                      event.benefits.length > 0 &&
                      <input type="button" className="button" style={{ marginLeft: 10 }} value={event.show_benefit_params ? ' Ellátás paramétereinek elrejtése ' : ' Ellátás paramétereinek mutatása '} onClick={() => this.toggleBenefitShow(index)} />
                    }
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
              </div>
              {
                event.show_benefit_params &&
                event.benefits.map((benefit) => (
                  event.benefit_params_descriptor.filter((param) => param.ELLATAS_CD === benefit.ELLATAS_KOD).length > 0 &&
                  <BenefitParams
                    key={benefit.ELLATAS_KOD}
                    top={180 + index * 30}
                    benefit={benefit.ELLATAS_NEV}
                    benefitParams={event.benefit_params_descriptor.filter((param) => param.ELLATAS_CD === benefit.ELLATAS_KOD)}
                    benefitDescription={benefit.ELLATAS_NEV}
                    params={event.benefit_params}
                    setParam={this.setBenefitParam(index, 'benefit_params')} />
                ))
              }
            </Fragment>
          ))
        }
        {
          this.props.eventList.length > 0 &&
          <Fragment >
            <div id="benefit_container" style={{ position: 'relative', top: 180 + this.props.eventList.length * 30, width: '80%', margin: 'auto', background: '#deb306', border: '1px solid #d1d1d1', padding: 0, paddingBottom: 0 }} >
              <div>
                <div style={{ paddingLeft: 20, paddingBottom: 8, fontSize: 14, textTransform: 'uppercase', paddingTop: 10 }} >
                  Nyugdíj
                </div>
                <div style={{ background: '#fff', padding: 5, borderTop: '1px solid #d1d1d1', margin: '0px auto', horizontalAlign: 'center' }} >
                </div>
              </div>
            </div>
            {
              this.props.nyug.benefits.map((benefit) => (
                this.props.nyug.benefit_params_descriptor.filter((param) => param.ELLATAS_CD === benefit.ELLATAS_KOD).length > 0 &&
                <BenefitParams
                  key={benefit.ELLATAS_KOD}
                  top={180 + this.props.eventList.length * 30}
                  benefit={benefit.ELLATAS_NEV}
                  benefitParams={this.props.nyug.benefit_params_descriptor.filter((param) => param.ELLATAS_CD === benefit.ELLATAS_KOD)}
                  benefitDescription={benefit.ELLATAS_NEV}
                  params={this.props.nyug.benefit_params}
                  setParam={this.setNyugParam} />
              ))
            }
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default Events;
