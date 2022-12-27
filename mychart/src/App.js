import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'

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
function OrgChart(){
	const svgRef = useRef();
	useEffect((() => {
		const svg = select(svgRef.current)
			.append('svg')
			.attr('width', 500)
			.attr('height', 500);
	}, []));
	return (
		<div ref = {svgRef}></div>
	);
}
function orgTable(){
	const [rows, setRows] = useState([
		{id:1, name:'John Doe', title:'CEO', manager:''},
		{id:2, name:'Jane Doe', title:'Chair', manager:''}
	]);
	const getUniqueNames = (rows) => {
		const names = rows.map(row => row.name);
		return [...new Set(names)];
	}
	const handleChange = (event, id) => {
		const updatedRows = rows.map(row => {
			if (row.id == id){
				return {...row, [event.target.name]: event.target.value};
			}
			return row;
		});
		setRows(updatedRows);
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
					</tr>
				))}
			</tbody>
		</table>
	);}
	
								



export default App;
