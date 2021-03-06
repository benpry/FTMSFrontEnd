import React, { Component } from 'react';

import '../App.css';
import CheckBoxList from './CheckBoxList.js'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import styleToImport from '../Utilities/Util.js'

const chosenStyle = styleToImport.styleToImport

class WorkOrder extends Component {
  state = {
    location: '',
    deadline: '',
    description: '',
    skills: []
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value,
    });
  };

  onSubmit = () => {
    this.state.skills = this.state.skills.toString()
    fetch('/work_orders/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(alert('Success! Check http://localhost:8080/work_orders/list'))
  }

  handleToggle = value => () => {
    const { skills } = this.state;
    const currentIndex = skills.indexOf(value);
    const newskills = [...skills];

    if (currentIndex === -1) {
      newskills.push(value);
    } else {
      newskills.splice(currentIndex, 1);
    }

    this.setState({
      skills: newskills,
    });
  };

  render() {
    return (
      <div className="App">

        <form>
          <TextField
            id="standard-location"
            label="Location"
            value={this.state.location}
            onChange={this.handleChange('location')}
            margin="normal"
            style={chosenStyle}
          />
          <br />

          <br />
          <TextField
            id="datetime-local"
            label="Deadline"
            value={this.state.deadline}
            onChange={this.handleChange('deadline')}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            style={chosenStyle}
          />

          <br />
          <br />
          <CheckBoxList skills={this.state.skills} handleToggle={this.handleToggle} chosenStyle={chosenStyle} />

          <TextField
            id="standard-description"
            label="Description"
            value={this.state.description}
            onChange={this.handleChange('description')}
            margin="normal"
            multiline={true}
            rows={4}
            style={chosenStyle}
          />
        </form>

        <br />
        <Button variant="contained" color="secondary" onClick={this.onSubmit}>
          Create work order
        </Button>
      </div>
    );
  }
}

export default WorkOrder;
