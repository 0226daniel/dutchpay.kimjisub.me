import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Textfield, IconToggle, Button, IconButton } from 'react-mdl'
import './EditableTextView.css'
import { bigNumberToCode } from '../algorithm'

class App extends Component {
	render() {
		return (
			<p className="editable-textview" style={this.props.style}>
				{this.props.editMode ? (
					<input
						placeholder={this.props.label}
						defaultValue={this.props.text}
						onChange={e => {
							if (this.props.onChange) this.props.onChange(e)
						}}
					/>
				) : (
					this.props.text
				)}
			</p>
		)
	}
}

export default App
