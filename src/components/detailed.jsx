import React, {Component} from 'react';
import Modal from "react-awesome-modal";
import Announcement from "./announcement";
import axios from 'axios';


class Detailed extends Component {

	state = {
		similarAnnouncements: []
	};

	async componentDidMount() {
		let similarAnnouncements = await this.getSimilarAnnouncements(this.props.announcement.id);
		similarAnnouncements = similarAnnouncements.data;
		this.setState({similarAnnouncements});
	}

	SIMILAR_COUNT = 3;

	getSimilarAnnouncements = async id => {
		return await axios.get(`http://localhost:8080/api/announcements/${id}/similar?size=${this.SIMILAR_COUNT}`)
	};


	render() {
		this.componentDidMount();
		const {closeModal, visible, announcement, onDelete} = this.props;

		const similarAnnouncements = this.state.similarAnnouncements;

		return (
			<section className=''>
				<Modal
					visible={visible}
					width="650"
					height="930"
					effect="fadeInUp"
					onClickAway={() => closeModal()}>

					<div>
						<div className="mb-2">
							<Announcement announcement={announcement}
							              onDelete={onDelete}/>
						</div>

						<div className="d-flex justify-content-center">
							<h2>Similar Announcements</h2>
						</div>

						<div>
							{similarAnnouncements.map(similarAnnouncement => (
								<div className="mb-2">
									<Announcement announcement={similarAnnouncement}
									              onDelete={onDelete}/>
								</div>
							))}
						</div>

					</div>
				</Modal>
			</section>
		);
	}
}

export default Detailed;
