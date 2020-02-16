import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { Textfield, Button, IconButton, Menu, MenuItem } from 'react-mdl'
import { bigNumberToCode } from '../algorithm'
import './ExpenditureCard.scss'

class App extends Component {
	constructor() {
		super()
		this.state = {
			addName: ''
		}
	}

	render() {
		return (
			<Card shadow={20} className="ExpenditureCard card">
				<Card.Body>
					<Card.Title>지출 내역</Card.Title>
					<table>
						<thead>
							<tr>
								<th>이름</th>
								<th>지출</th>
								<th>결제</th>
								{this.props.editMode ? <th>삭제</th> : null}
							</tr>
						</thead>
						<tbody>
							{Object.entries(this.props.members).map(data => {
								let id = data[0]
								let name = data[1]

								let spend = this.props.expenditure[id].spend
								let paied = this.props.expenditure[id].paied
								return (
									<tr
										key={id}
										action={!this.props.editMode}
										onClick={() => {
											if (!this.props.editMode) this.props.onMemberClick(id)
										}}>
										<td>{name}</td>
										<td>{spend}</td>
										<td>{paied}</td>
										{this.props.editMode ? (
											<td>
												<IconButton name="close" id={'member-delete-' + id} disabled={!(spend === 0 && paied === 0)} />
												<Menu target={'member-delete-' + id}>
													<MenuItem
														onClick={() => {
															if (spend === 0 && paied === 0) {
																let members = Object.assign({}, this.props.members)
																delete members[id]
																this.props.onMembersChange(members)
															}
														}}>
														삭제
													</MenuItem>
												</Menu>
											</td>
										) : null}
									</tr>
								)
							})}
						</tbody>
						<tfoot>
							{this.props.editMode ? (
								<tr>
									<th colSpan="3">
										<Textfield
											className="mdl-textfield-small textfield-add-name"
											label="이름"
											value={this.state.addName}
											onChange={e => {
												this.setState({ addName: e.target.value })
											}}
										/>
									</th>
									<th>
										<IconButton
											ripple
											name="add"
											onClick={() => {
												let members = Object.assign({}, this.props.members)
												members[bigNumberToCode(new Date())] = this.state.addName
												this.props.onMembersChange(members)
												this.setState({ addName: '' })
											}}>
											추가
										</IconButton>
									</th>
								</tr>
							) : null}
						</tfoot>
					</table>
				</Card.Body>
			</Card>
		)
	}
}

export default App
