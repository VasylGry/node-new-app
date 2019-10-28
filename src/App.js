import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { progJson } from './prog.json';

var server_path = window.location.host;

const jsonData = [
		{id: 1, time: "08:20:00", pump: 1},
		{id: 2, time: "08:40:00", pump: 0},
		{id: 3, time: "14:00:00", pump: 1},
		{id: 4, time: "14:10:00", pump: 0},
		{id: 5, time: "07:30:00", light: 0},
		{id: 6, time: "19:30:00", light: 1},
]

class CtrlButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      cmd:  ""
    }
    this.handleClick = this.handleClick.bind(this);
  } 
  handleClick() {
    this.setState(state => ({
        isOn: !state.isOn
    }));
    const onOff = this.state.isOn ? 0 : 1;
    const url = server_path + '/progs.json';
    
  fetch('./progs.json')
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(result => {
      this.setState({cmd : result});
		  console.log(this.state.cmd);
    });
  }
  render() {
    return (
      <div>
          <button onClick={this.handleClick} >
            {this.state.isOn ? 'Вкл.' : 'Выкл.'}
          </button>
          <label>{this.props.name}</label>
       </div>
    )
  }
}

class ProgramRow extends React.Component {
  render() {
    const name = this.props.name;
    return (
      <tr>
        <th colSpan="2">
          {name}
        </th>
      </tr>
    );
  }
}

class DeviceRow extends React.Component {
  render() {
    const device = this.props.device;
    const time = device.time;
    const onOff = device.onOff ? undefined : device.onOff;
    const temperature = device.temperature ? undefined : device.temperature;
    return (
      <tr>
        <td>{time}</td>
        <td>{onOff}</td>
        <td>{temperature}</td>
      </tr>
    );
  }
}

class ProgramTable extends React.Component {
  render() {
    const rows = [];
    let lastName = null;
    
    this.props.programs.forEach((program) => {
      if (program.device !== lastName) {
        rows.push(
          <ProgramRow
            device={program.device}
            key={program.device} />
        );
      }
      rows.push(
        <DeviceRow
          device={program.device}
          key={program.device} />
      );
      lastName = program.device;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>State</th>
            <th>Temperature [min, max]</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      dateTime: '',
      temperature: '',
      programs: [], //this.handlePrograms(),
      date: new Date()};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePrograms = this.handlePrograms.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.handlePrograms(this.state.value);
  //        alert('Выбрана Программа №' + this.state.value);
    event.preventDefault();
  }

  handlePrograms(id) {
    const prog_id = Number(id);  
    fetch('./progs.json')
    .then(response => {
      console.log(prog_id + " typrof:  " + typeof(prog_id))
      return response.json();
    }).then(result => {
      this.setState({programs : result.filter(object => object.id === prog_id)
      });
//          console.log(this.state.programs)
    }).catch(err => {
      console.log("Error Reading data " + err);
    });
  }

  render() {
    return (
      <div>
     <p>
			  <CtrlButton name = " Load json" />
		  </p>
      <label>
        Программа&nbsp;&nbsp;:
        <select defaultValue = "Выберите программу" onChange={this.handleChange}>
          <option value="1">Программа №1</option>
          <option value="2">Программа №2</option>
          <option value="3">Программа №3</option>
          <option value="4">Программа №4</option>
        </select>
      </label>
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="Выбрать" />
      </form>
      <div>
        <ProgramTable programs = {this.state.programs} />
      </div>
      <div>
        <p>{JSON.stringify(this.state.programs)}</p>
      </div>
    </div>
  );}
}

function App() {
//  render() {
    return (
      <div>
        < TestPage />
      </div>
    );
//  }
}

export default App;
