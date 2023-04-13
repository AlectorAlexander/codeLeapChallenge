import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { insert_post } from '../redux/actions';
import '../styles/modal.css';
import Posts from './Posts';
import { createPosts } from '../services/BDrequests';

function YourPosts() {
	/* const username = useSelector(state => state.name); */
	const [title, setTitle] = useState('');
	const [content, setPost] = useState('');
	const [warning, setWarning] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);
	const posts = useSelector(({userReducer}) => userReducer.posts);
	const username = useSelector(({userReducer}) => userReducer.username);




	const dispatch = useDispatch();

	const createPost = async () => {

		const body = {
			title,
			content,
			username,
		};
		const post = await createPosts(body);
		dispatch(insert_post(post));
		setTitle('');
		setPost('');
		setWarning('');
	};

	const handleEnterKey = (event) => {
		if (event.key === 'Enter' && isDisabled === false) {
			return createPost();
		}
	};


	const handleTitleChange = (event) => {
		return setTitle(event.target.value);
	};

	const handleTextChange = (event) => {
		return setPost(event.target.value);
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

	return (
		<div id="modal-top"
			
		>
			<Modal
				className='modal-content-2' show={true} centered>
				<Modal.Header>
					<Modal.Title>CodeLeap Network!</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Group className='textarea' controlId="formTitle">
						<Form.Label>Title:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Hello world"
							value={title}
							onChange={handleTitleChange}
							onKeyPress={handleEnterKey}
						/>
						<Form.Label>Content:</Form.Label>
						<Form.Control
							type="text"
							as='textarea'
							rows={9}
							placeholder="Content here"
							value={content}
							onChange={handleTextChange}
						/>
					</Form.Group>
					<Button disabled={isDisabled} className="mt-1 modal-button" variant="primary" onClick={createPost}>
            Create
					</Button>
				</Modal.Body>
				<p className='d-flex justify-content-center text-danger'>{warning}</p>
				{posts.length > 0 &&  posts.map((p) => {
					return (<Posts key={p.id} p={p}/>);
				}) }
				
			</Modal>
			
		</div>
	);
}

export default YourPosts;
