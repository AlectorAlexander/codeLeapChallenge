export const insert_name = (username) => ({
	type: 'insert_name',
	username: `@${username}`
});

export const insert_post = (posts) => ({
	type: 'insert_post',
	posts
});

export const edit_post = (posts) => ({
	type: 'edit_post',
	posts
});

export const delete_post = (id) => ({
	type: 'delete_post',
	id
});