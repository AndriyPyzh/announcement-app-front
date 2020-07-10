import React, {Component} from 'react';
import Moment from 'moment';
import AddForm from './addForm';
import Detailed from "./detailed";

class Announcement extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visibleForm: false,
			visibleDetails: false
		}
	}

	openModalDetailed = () => {
		this.setState({
			visibleDetails: true
		})
	};

	closeModalDetailed = () => {
		this.setState({
			visibleDetails: false
		})
	};

	openModalForm = () => {
		this.setState({
			visibleForm: true
		});
	};

	closeModalForm = () => {
		this.setState({
			visibleForm: false
		});
	};

	render() {
		const {onChangeAnnouncement, announcement, onDelete} = this.props;

		return (

			<div
				className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative m-auto"
				style={{width: 650, height: 215}}>

				<div className="ml-4 mt-auto mb-auto">

					<h1>{announcement.title}</h1>

					<div style={{color: "grey", fontSize: 18}} className="mt-2 mb-2">
						<i className="fa fa-calendar-minus"/>
						{Moment(announcement.dateAdded).format('MMM d YYYY')}
					</div>

					<div style={{width: 400}}>
						<p className="card-text mb-2">{announcement.description}</p>
					</div>

				</div>

				<div className="m-auto ml-3">

					<button className="btn btn-secondary d-block m-4" style={{width: 150}}
					        onClick={this.openModalDetailed}
					>Details
					</button>

					{this.state.visibleDetails ?
						<Detailed visible={this.state.visibleDetails}
						          closeModal={this.closeModalDetailed}
						          announcement={announcement}
						          onDelete={onDelete}
						          onChangeAnnouncement={onChangeAnnouncement}/>
						: ''}

					<button className="btn btn-primary d-block m-4" style={{width: 150}}
					        onClick={() => this.openModalForm()}>Edit
					</button>

					{this.state.visibleForm ?
						<AddForm onChangeAnnouncement={onChangeAnnouncement}
						         visible={this.state.visibleForm}
						         closeModal={this.closeModalForm}
						         announcement={announcement}
						         name="Edit Announcement"/>
						: ''
					}


					<button className="btn btn-danger d-block m-4"
					        style={{width: 150}}
					        onClick={() => onDelete(announcement.id)}>Delete
					</button>
				</div>
			</div>
		);
	}
}

export default Announcement;
