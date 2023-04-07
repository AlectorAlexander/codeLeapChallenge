import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/modal.css';

function YourName() {
	const [username, setUsername] = useState('');
	const [show, setShow] = useState(true);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleEnterKey = (event) => {
		if (event.key === 'Enter') {
			setShow(false);
		}
	};

	return (
		<Modal show={show} centered>
			<Modal.Header>
				<Modal.Title>Welcome to CodeLeap network!</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form.Group controlId="formUsername">
					<Form.Label>Please enter your username:</Form.Label>
                    @
					<Form.Control
						type="text"
						placeholder="John Lano"
						value={username}
						onChange={handleUsernameChange}
						onKeyPress={handleEnterKey} // adiciona o evento de teclado "Enter" para o input
					/>
					<Button className="mt-1 modal-button" variant="primary" onClick={() => setShow(false)}>
            Enter
					</Button>
				</Form.Group>
			</Modal.Body>
		</Modal>
	);
}

export default YourName;
