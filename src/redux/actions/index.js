export const insert_name = (name) => ({
	type: 'insert_name',
	name: `@${name}`
});

export const insert_post = (post) => ({
	type: 'insert_post',
	post
});

export const edit_post = (post) => ({
	type: 'edit_post',
	post
});

export const delete_post = (id) => ({
	type: 'delete_post',
	id
});