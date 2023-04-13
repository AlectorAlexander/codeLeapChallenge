
const INITIAL_STATE = {
	username: '',
	posts: []
};

const userReducer = (state= INITIAL_STATE, action) => {
	switch (action.type){
	case 'insert_name':
		return {
			...state,
			username: action.username 
		};
	case 'insert_post':
		return {
			...state,
			posts: [...state.posts, action.posts]
		};
	case 'edit_post':
		return {
			...state,
			posts: state.posts.map((p) => {
				if (p.id === action.posts.id) {
					return action.posts;
				} else {
					return p;
				}
			})
		};
	case 'delete_post':
		return {
			...state,
			posts: state.posts.filter((p) => {
				return p.id !== action.id;
			})
		};
	default:
		return state;
	}
};
                                           
export default userReducer;