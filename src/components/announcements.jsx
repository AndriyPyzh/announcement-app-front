import React, {Component} from 'react';

import Announcement from "./announcement";
import axios from 'axios';

import AddForm from "./addForm";
import Pagination from "./pagination";
import _ from 'lodash';

class Announcements extends Component {
	PAGE_SIZE = 3;

	state = {
		announcements: [],
		modalVisible: false,
		pageSize: this.PAGE_SIZE,
		currentPage: 1,
	};

	async componentDidMount() {
		const {data: announcements} = await axios.get("http://localhost:8080/api/announcements/?page=0&size=10");
		this.setState({announcements: announcements.content});
	}

	handleDelete = async id => {
		await axios.delete(`http://localhost:8080/api/announcements/${id}`);
		this.componentDidMount();
	};

	handleCreate = async (announcement) => {
		if (announcement.title && announcement.description) {
			await axios.post(`http://localhost:8080/api/announcements`, {
				title: announcement.title,
				description: announcement.description
			});
		}
		this.componentDidMount();
	};

	handleUpdateAnnouncement = async (announcement) => {
		if (announcement.title && announcement.description) {
			await axios.put(`http://localhost:8080/api/announcements/${announcement.id}`, {
				title: announcement.title,
				description: announcement.description
			});
		}
		this.componentDidMount();
	};

	openModal = () => {
		this.setState({
			modalVisible: true
		});
	};

	closeModal = () => {
		this.setState({
			modalVisible: false
		});
	};

	handlePageChange = currentPage => {
		this.setState({currentPage});
	};

	paginate = (paginate, pageNumber, pageSize) => {
		const startIndex = (pageNumber - 1) * pageSize;
		return _(paginate).slice(startIndex).take(pageSize).value();
	};

	render() {
		const {announcements: allAnnouncements, pageSize, currentPage} = this.state;

		const announcements = this.paginate(allAnnouncements, currentPage, pageSize);


		return (
			<React.Fragment>
				<div className="d-flex justify-content-between">
					<div/>
					<div style={{width: 200}}>
						<h1>Announcements</h1>
					</div>

					<div>
						<button className="btn btn-success mr-5 mt-2"
						        onClick={() => this.openModal()}>Add
						</button>
					</div>
				</div>

				<div>
					{this.state.modalVisible ?
						<AddForm onChangeAnnouncement={this.handleCreate}
						         visible={this.state.modalVisible}
						         openModal={this.openModal}
						         closeModal={this.closeModal}
						         name="Add Announcement"/>
						: ''
					}
				</div>
				<div>
					{announcements.map(announcement => (
						<div key={announcement.id}
						     className="mb-4">
							<Announcement announcement={announcement}
							              onChangeAnnouncement={this.handleUpdateAnnouncement}
							              onDelete={this.handleDelete}
							              visible={this.state.modalVisible}
							              openModal={this.openModal}
							              closeModal={this.closeModal}/>
						</div>
					))}
				</div>
				<div className="d-flex justify-content-center">
					<Pagination
						itemsCount={allAnnouncements.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}/>
				</div>

			</React.Fragment>
		);
	}
}

export default Announcements;
