
const INITIAL_STATE = {
	name: '',
	post: []
};

const userReducer = (state= INITIAL_STATE, action) => {
	switch (action.type){
	case 'insert_name':
		return {
			...state,
			name: action.name 
		};
	case 'insert_post':
		return {
			...state,
			post: [...state.post, action.post]
		};
	case 'edit_post':
		return {
			...state,
			post: state.post.map((p) => {
				if (p.postId === action.post.postId) {
					return action.post;
				} else {
					return p;
				}
			})
		};
	case 'delete_post':
		return {
			...state,
			post: state.post.filter((p) => {
				return p.postId !== action.postId;
			})
		};
	default:
		return state;
	}
};
                                           
export default userReducer;