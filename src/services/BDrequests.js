import axios from 'axios';

const baseURL = 'https://dev.codeleap.co.uk/';

const instance = axios.create({
	baseURL,
});


export async function getPosts() {
	const response = await instance
		.get('careers/', { headers: { 'Content-Type': 'application/json'} })
		.catch((error) => {
			console.log(error);
			return error.response.error;
		});
	if (response.status === 200){
		const { data} = response;
		return data;
	}

	return response;
}

export async function createPosts(post) {
	const response = await instance
		.post('careers/', post)
		.catch((error) => {
			console.log(error);
			return error.response.error;
		});
	if (response.status === 201){
		const { data} = response;
		return data;
	}
	return response;
}

export async function editPosts(id,post) {
	const response = await instance
		.patch(`careers/${id}/`, post)
		.catch((error) => {
			console.log(error);
			return error.response;
		});
	if (response.status === 200){
		const { data } = response;
		return data;
	} else {
		return null;
	}
}

export async function deletePosts(id) {
	const response = await instance
		.delete(`careers/${id}/`)
		.catch((error) => {
			console.log(error);
			if (error.response.status === 404) {
				return error.response;
			}
			return error.response.error;
		});
	return response;
}