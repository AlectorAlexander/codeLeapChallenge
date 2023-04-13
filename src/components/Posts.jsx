import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import '../styles/post.css';
import { delete_post, edit_post } from '../redux/actions';
import moment from 'moment';
import DeleteModal from './DeletePost';
import { deletePosts, editPosts } from '../services/BDrequests';

const Posts = ({ p }) => {
	const [edit, setEdit] = useState(false);
	const [ShowDelete, setShowDelete] = useState(false);
	const [title, setTitle] = useState('');
	const [warning, setWarning] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [content, setPost] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		setTitle(p.title);
		setPost(p.content);
	}, []);

	function getTimeAgo() {
		const date = p.created_datetime;
		const timeAgo = moment(date).fromNow();
		return timeAgo;
	}

	async function editPost() {
		const body = {
			title,
			content,
		};
		const post = await editPosts(p.id, body) || {title, content, id: p.id};
		
		dispatch(edit_post(post));
		setEdit(false);
	}

	const deletePost = async () => {
		await deletePosts(p.id);
		dispatch(delete_post(p.id));
		setEdit(false);

	};

	useEffect(() => {
		const lastTitleValidation = title.length > 3 && title.length < 45;
		const lastPostValidation = content.length > 3;
		if (title.length > 0 && title.length < 4) {
			setWarning('Title must be at least 4 characters long');
			setIsDisabled(true);
		} else if (title === '') {
			setIsDisabled(true);
			setWarning('');
		} else if (title.length > 44) {
			setIsDisabled(true);
			setWarning('Title cannot be longer than 44 characters');
		} else if (lastTitleValidation && lastPostValidation) {
			setIsDisabled(false);
			setWarning('');
		}else if (title.length > 3 && title.length < 45) {
			setWarning('');
		}
	}, [title]);

	useEffect(() => {
		const lastTitleValidation = title.length > 3 && title.length < 45;
		const lastPostValidation = content.length > 3;
		if (content.length > 0 && content.length < 4) {
			setWarning('Post must be at least 4 characters long');
			setIsDisabled(true);
		} else if (content === '') {
			setIsDisabled(true);
			setWarning('');
		} else if (lastTitleValidation && lastPostValidation) {
			setIsDisabled(false);
			setWarning('');
		} else if (lastPostValidation) {
			setWarning('');
		} 
	}, [content]);

	const renderFormOrContainerRows = () => {
		return edit ? (
			<Form.Group className='postEdit' controlId="formTitle">
				<Form.Label className='title d-flex align-items-end justify-content-between'>
					Title:
					<div className='d-flex flex-row justify-content-center'>
						
						<Button onClick={() => setEdit(!edit)} className="m-1 modal-button" variant="danger">
            Cancel 
						</Button>
						<Button onClick={editPost} className="m-1 modal-button" disabled={isDisabled} variant="success">
            Save
						</Button>
						
					</div>
				</Form.Label>

				<Form.Control
					type="text"
					placeholder="Hello world"
					value={title}
					onChange={({target}) => setTitle(target.value) }
				/>
				<Form.Label>Content:</Form.Label>
				<Form.Control
					type="text"
					as='textarea'
					rows={9}
					placeholder="Content here"
					value={content}
					onChange={({target}) => setPost(target.value) }
				/>
				
				<p className='d-flex justify-content-center text-danger'>{warning}</p>
			</Form.Group>
		) : (
			<Container className='card_post'>
				<DeleteModal show={ShowDelete} setShow={setShowDelete} deletePost={deletePost} />
				<Row key={p.id} className="mb-4">
					<div className='post_header d-flex flex-row'>
						<div>
							<p>
								{p.username}
							</p>
							<small>Posted {getTimeAgo()}</small>
						</div>
						
						<div className='button_posts d-flex flex-row'>

							<Button className='mx-1' variant='danger' onClick={() => setShowDelete(!ShowDelete)}>
              Delete
							</Button>
							<Button className='mx-1' onClick={() => setEdit(!edit)}>
              Edit
							</Button>
						</div>
					</div>

					<Col className='linhas'>
						<h3>{p.title}</h3>
						<div className='mb-5' style={{ whiteSpace: 'pre-wrap' }}>{p.content}</div>
					</Col>
				</Row>

			</Container>
		);
	};
 
	return (
		<div>
			{renderFormOrContainerRows()}
		</div>
	);
};

Posts.propTypes = {
	p: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		created_datetime: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}).isRequired,
};

export default Posts;
