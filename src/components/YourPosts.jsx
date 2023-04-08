import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { insert_name, insert_post } from '../redux/actions';
import '../styles/modal.css';
import { v4 } from 'uuid';

function YourPosts() {
	/* const username = useSelector(state => state.name); */
	const [Title, setTitle] = useState('');
	const [Post, setPost] = useState('');
	const [warning, setWarning] = useState('');
	const [Action, setAction] = useState('create');
	const [isDisabled, setIsDisabled] = useState(true);

	const dispatch = useDispatch();

	const createPost = () => {
		const postId = v4();
		const post = {
			postId,
			Title,
			Post,
		};
		dispatch(insert_post(post));
		setTitle('');
		setPost('');
		setWarning('');
	};

	const handleEnterKey = (event) => {
		if(Action === 'create') {
			if (event.key === 'Enter' && isDisabled === false) {
				return createPost();
			}
		}
	};

	const renderButton = (action) => {
		if(action === 'create') {
			return (<Button disabled={isDisabled} className="mt-1 modal-button" variant="primary" onClick={createPost}>
            Create
			</Button>);
		} else if (action === 'edit') {
			return (
				<Button disabled={isDisabled} className="mt-1 modal-button" variant="primary" onClick={createPost}>
            Edit
				</Button>);
		}
	};

	const handleTitleChange = (event) => {
		return setTitle(event.target.value);
	};

	const handleTextChange = (event) => {
		return setPost(event.target.value);
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

	return (
		<Modal className='modal-content-2' show={true} centered>
			<Modal.Header>
				<Modal.Title>CodeLeap Network!</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form.Group className='textarea' controlId="formTitle">
					<Form.Label>Title:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Hello world"
						value={Title}
						onChange={handleTitleChange}
						onKeyPress={handleEnterKey}
					/>
					<Form.Label>Content:</Form.Label>
					<Form.Control
						type="text"
						as='textarea'
						rows={9}
						placeholder="Content here"
						value={Post}
						onChange={handleTextChange}
						onKeyPress={handleEnterKey}
					/>
					{renderButton(Action)}
				</Form.Group>
			</Modal.Body>
			<p className='d-flex justify-content-center text-danger'>{warning}</p>
		</Modal>
	);
}

export default YourPosts;
