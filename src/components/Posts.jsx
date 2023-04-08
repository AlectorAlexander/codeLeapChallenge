import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Container } from 'react-bootstrap';
import '../styles/post.css';

const Posts = ({ p }) => {
	const username = useSelector(({ userReducer }) => userReducer.name);
 
	return (
		<Container className='card_post'>
			<Row key={p.postId} className="mb-4">
				<div className='post_header d-flex flex-row'>
					<p>
						{username}
					</p>
					<div className='button_posts d-flex flex-row'>
						<Button variant='danger'>
              Deletar
						</Button>
						<Button>
              Editar
						</Button>
					</div>
				</div>
				<Col className='linhas'>
					<h3>{p.Title}</h3>
					<p>{p.Post}</p>
				</Col>
			</Row>
		</Container>
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
