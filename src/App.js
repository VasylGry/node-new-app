import React from 'react';
import logo from './logo.svg';
import './App.css';

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
      devices: [{id: 1, time: "08:20:00", pump: 1, light: 0 }]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  renderTableHeader() {
    let header = Object.keys(this.state.devices[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

  renderTableData() {
      return jsonData.map((device, index) => {
         const {id, time, pump, light } = device //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{time}</td>
               <td>{pump === undefined ? '********' : pump === 1 ? "ON" : "OFF"}</td>
               <td>{light === undefined ? '********' : light=== 1 ? "ON" : "OFF"}</td>
            </tr>
         );
      });
   }
 
   handleClick() {
    this.setState(state => ({
        isOn: !state.isOn
    }));
  }
 
  render() {
    const mystyle = {
      color: "black",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
    return (
      <div>
          <button onClick={this.handleClick}>
            {this.state.isOn ? 'Вкл.' : 'Выкл.'}
          </button>
		    <table id='device'>
			    <tbody>
            <tr className="App-devices-th">{this.renderTableHeader()}</tr>
          	{this.renderTableData()}
          </tbody>
    	  </table>
      </div>
    )
  }
}

function App() {

  return (
	
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		<p>
			<CtrlButton name = " Полив" />
		</p>
        <p>
          Edit <code>src/App.js</code> and save to reload !
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
