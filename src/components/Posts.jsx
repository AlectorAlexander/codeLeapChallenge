import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import '../styles/post.css';
import { delete_post, edit_post } from '../redux/actions';
import moment from 'moment';
import DeleteModal from './DeletePost';

const Posts = ({ p }) => {
	const [edit, setEdit] = useState(false);
	const [ShowDelete, setShowDelete] = useState(false);
	const [Title, setTitle] = useState('');
	const [warning, setWarning] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const [Post, setPost] = useState('');
	const username = useSelector(({ userReducer }) => userReducer.name);
	const dispatch = useDispatch();

	useEffect(() => {
		setTitle(p.Title);
		setPost(p.Post);
	}, []);

	function getTimeAgo() {
		const date = new Date();
		const timeAgo = moment(date).fromNow();
		return timeAgo;
	}

	function editPost() {
		const post = {
			Title,
			Post,
			postId: p.postId,
		};
		dispatch(edit_post(post));
		setEdit(false);
	}

	const deletePost = () => {
		dispatch(delete_post(p.postId ));
		setEdit(false);
	};

	useEffect(() => {
		const lastTitleValidation = Title.length > 3 && Title.length < 45;
		const lastPostValidation = Post.length > 3;
		if (Title.length > 0 && Title.length < 4) {
			setWarning('Title must be at least 4 characters long');
			setIsDisabled(true);
		} else if (Title === '') {
			setIsDisabled(true);
			setWarning('');
		} else if (Title.length > 44) {
			setIsDisabled(true);
			setWarning('Title cannot be longer than 44 characters');
		} else if (lastTitleValidation && lastPostValidation) {
			setIsDisabled(false);
			setWarning('');
		}else if (Title.length > 3 && Title.length < 45) {
			setWarning('');
		}
	}, [Title]);

	useEffect(() => {
		const lastTitleValidation = Title.length > 3 && Title.length < 45;
		const lastPostValidation = Post.length > 3;
		if (Post.length > 0 && Post.length < 4) {
			setWarning('Post must be at least 4 characters long');
			setIsDisabled(true);
		} else if (Post === '') {
			setIsDisabled(true);
			setWarning('');
		} else if (lastTitleValidation && lastPostValidation) {
			setIsDisabled(false);
			setWarning('');
		} else if (lastPostValidation) {
			setWarning('');
		} 
	}, [Post]);

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
					value={Title}
					onChange={({target}) => setTitle(target.value) }
				/>
				<Form.Label>Content:</Form.Label>
				<Form.Control
					type="text"
					as='textarea'
					rows={9}
					placeholder="Content here"
					value={Post}
					onChange={({target}) => setPost(target.value) }
				/>
				
				<p className='d-flex justify-content-center text-danger'>{warning}</p>
			</Form.Group>
		) : (
			<Container className='card_post'>
				<DeleteModal show={ShowDelete} setShow={setShowDelete} deletePost={deletePost} />
				<Row key={p.postId} className="mb-4">
					<div className='post_header d-flex flex-row'>
						<div>
							<p>
								{username}
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
						<h3>{p.Title}</h3>
						<div className='mb-5' style={{ whiteSpace: 'pre-wrap' }}>{p.Post}</div>
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
		postId: PropTypes.number.isRequired,
		Title: PropTypes.string.isRequired,
		Post: PropTypes.string.isRequired,
	}).isRequired,
};

export default Posts;
