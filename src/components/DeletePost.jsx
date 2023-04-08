import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteModal({show, setShow, deletePost}) {

	const handleClose = () => setShow(false);

	const handleDelete = () => {
		deletePost();
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title><strong>Are you sure you want to delete this item?</strong></Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
            Cancel
				</Button>
				<Button variant="danger" onClick={handleDelete}>
            Delete
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;
