import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import {select, hierarchy, tree} from 'd3';

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
		{id:1, name:'John Doe', title:'CEO'}, 
		{id:2, name:'Jane Doe', title:'Chair', manager:1},
		{id:3, name:'James Doe', title: 'Manager', manager:2},
		{id:4, name:'Arthur Doe', title: 'Manager', manager:2}
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
			</tbody>	
		
						<button 
							name = "addRow"
							onClick = {() => setRows([...rows, {id:rows.length+1, name:'', title:'', manager:''}])}
						>
							Add Row
						</button>
			<div>
				<DrawOrgChart data = {rows} />
			</div>
		</table>
	);}
	
								


function DrawOrgChart(props){ 
	const root = {name: 'Root Node', children:[], value:1};
	const nodes = {};
	props.data.forEach(item => {
		const node = {name: item.name, value:1};
		nodes[item.id] = node;
		if (item.manager == null){
			root.children.push(node);
		}
		else {
			const parentNode = nodes[item.manager];
			if(parentNode.children == null){
				parentNode.children = [];
			}
			parentNode.children.push(node);
		}
	});
	console.log(root);
	const treeRoot = hierarchy(root);
	const container = select('#org-chart');
	const svg = container.append('svg')
		.attr('width', 1000)
		.attr('height', 1000);
	const treeLayout = tree().size([250,250]);
	treeLayout(treeRoot);
	svg.selectAll('.node')
		.data(treeRoot.descendants())
		.enter()
		.append('circle')
		.attr('cx', d=>d.x)
		.attr('cy', d=>d.y)
		.attr('r', 5)
		.attr('fill', 'black');
}
export default orgTable;
export {DrawOrgChart};
