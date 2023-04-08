import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { insert_name } from '../redux/actions';
import '../styles/modal.css';

function YourName() {
	const [username, setUsername] = useState('');
	const [show, setShow] = useState(true); 
	const [warning, setWarning] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const dispatch = useDispatch();

	const handleUsernameChange = (event) => {
		return setUsername(event.target.value);
	};

	const handleEnterKey = (event) => {
		if (event.key === 'Enter' && isDisabled === false) {
			console.log(name);
			setShow(false);
		}
	};

	useEffect(() => {
		if (!show) {
			dispatch(insert_name(username));
		}

	}, [show]);

	useEffect(() => {
		if (username.length > 0 && username.length < 4) {
			setWarning('Username must be at least 4 characters long');
			setIsDisabled(true);
		} else if (username.length > 14) {
			setIsDisabled(true);
			setWarning('Username cannot be longer than 14 characters');
		} else if (username.includes(' ')) {
			setIsDisabled(true);
			setWarning('Username cannot have a space');
		} else if (username === '') {
			setIsDisabled(true);
			setWarning('');
		} else {
			setIsDisabled(false);
			setWarning('');
		}
	}, [username]);

	return (
		<Modal className='modal-content-1' show={show} centered>
			<Modal.Header>
				<Modal.Title>Welcome to CodeLeap network!</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form.Group controlId="formUsername">
					<Form.Label>Please enter your username:</Form.Label>
                    @
					<Form.Control
						type="text"
						placeholder="John_lano"
						value={username}
						onChange={handleUsernameChange}
						onKeyPress={handleEnterKey}
					/>
					<Button disabled={isDisabled} className="mt-1 modal-button" variant="primary" onClick={() => setShow(false)}>
            Enter
					</Button>
				</Form.Group>
			</Modal.Body>
			<p className='d-flex justify-content-center text-danger'>{warning}</p>
		</Modal>
	);
}

export default YourName;
