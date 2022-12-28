import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import {select} from 'd3';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. OK.
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
function orgTable() {
	const [rows, setRows] = useState([
		{id:1, name:'John Doe', title:'CEO', manager:'Jane Doe'}, 
		{id:2, name:'Jane Doe', title:'Chair', manager:''}
	]);
	const getUniqueNames = () => {
		const names = rows.map(row => row.name);
		return [...new Set(names)];
	}
	const [uniqueNames, setUniqueNames] = useState(getUniqueNames(rows));
	const handleChange = (event, id) => {
		const updatedRows = rows.map(row => {
			if (row.id == id){
				return {...row, [event.target.name]: event.target.value};
			}
			return row;
		});
		setRows(updatedRows);
		setUniqueNames(getUniqueNames());

	}
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Title</th>
					<th>Manager</th>
				</tr>
			</thead>
			<tbody>
				{rows.map(row => (
					<tr key = {row.id}>
						<td>
							<input 
								type = "text"
								name = "name" 
								value = {row.name} 
								onChange = {event => handleChange(event, row.id)} 
							/>
						</td>
						<td>
							<input
								type = "text"
								name = "title"
								value = {row.title}
								onChange = {event => handleChange(event, row.id)}
							/>
						</td>
						<td>
							<select
								name = "manager"
								value = {row.manager}
								onChange = {event => handleChange(event, row.id)}
							>
							{uniqueNames.map(name => (
								<option key = {name} value = {name}>{name}</option>
							))}
								
							</select>
						</td>
					</tr>
				))}
					<tr>
						<button 
							name = "addRow"
							onClick = {() => setRows([...rows, {id:rows.length+1, name:'', title:'', manager:''}])}
						>
							Add Row
						</button>
					</tr>
			</tbody>
		</table>
	);}
	
								



export default orgTable;
