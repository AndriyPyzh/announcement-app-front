import React, {Component} from 'react';
import Modal from 'react-awesome-modal';

export default class Examples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.announcement ? this.props.announcement.title : '',
			description: this.props.announcement ? this.props.announcement.description : ''
		};
	}

	clearInput = () => {
		this.setState({title: '', description: ''});
	};

	updateTitle = evt => {
		this.setState({title: evt.target.value})
	};

	updateDescription = evt => {
		this.setState({description: evt.target.value})
	};

	render() {

		const {onChangeAnnouncement, closeModal, visible, name} = this.props;

		return (
			<section>
				<Modal
					visible={visible}
					width="600"
					height="400"
					effect="fadeInUp"
					onClickAway={() => closeModal()}>

					<div>

						<h1 className="d-flex justify-content-center m-4">{name}</h1>

						<div className="m-auto" style={{width: 550}}>
							<label>Title</label>
							<div className="input-group mb-3">
								<input type="text" className="form-control" value={this.state.title}
								       onChange={event => this.updateTitle(event)}
								       aria-describedby="basic-addon3"/>
							</div>
						</div>

						<div className="m-auto" style={{width: 550}}>
							<label>Description</label>
							<div className="input-group mb-3">
								<textarea style={{height: 100}} className="form-control "
								          value={this.state.description}
								          onChange={event => this.updateDescription(event)}
								          aria-describedby="basic-addon3"/>
							</div>
						</div>

						<button className="btn btn-success pull-right align-bottom mr-4" style={{width: 80}}
						        onClick={() => {
							        onChangeAnnouncement(this.props.announcement ?
								        {
									        id: this.props.announcement.id,
									        title: this.state.title,
									        description: this.state.description
								        } : {
									        title: this.state.title,
									        description: this.state.description
								        });
							        this.clearInput();
							        closeModal();
						        }}>Ok
						</button>

						<button className="btn btn-secondary pull-right align-bottom mr-4" style={{width: 80}}
						        onClick={() => closeModal()}>Close
						</button>

					</div>
				</Modal>
			</section>
		);
	}
}
