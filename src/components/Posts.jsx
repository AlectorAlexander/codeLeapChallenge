import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const Posts = () => {
	const posts = useSelector(({userReducer}) => userReducer.post);
	const username = useSelector(({userReducer}) => userReducer.name);


	return (
		<Container>
			{posts.map(p => (
				<Row key={p.postId} className="mb-4">
					<Col>
						<div>
							<p>
								{username}
							</p>
						</div>
						<h3>{p.Title}</h3>
						<p>{p.Post}</p>
					</Col>
				</Row>
			))}
		</Container>
	);
};

export default Posts;
