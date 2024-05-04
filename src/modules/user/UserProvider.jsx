import {createContext, useReducer, useContext} from 'react';

export const USER_ACTIONS = {
	logIn: 'log_in',
	logOut: 'log_out',
	updateUser: 'updated_user'
};

export const loggedInUser = {
	isLoggedIn: false,
	username: '',
};


export const UserContext = createContext();
export const UserDispatchContext = createContext();

export const UserProvider = ({children, initialState}) => {
	const [user, dispatch] = useReducer(userReducer, initialState ?? {});

	return (
		<UserContext.Provider value={user}>
			<UserDispatchContext.Provider value={dispatch}>
				{children}
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	)
};

function userReducer (state, action) {
	switch (action.type) {
		case USER_ACTIONS.logIn: {
			return (
				{...state, isLoggedIn: true}
			);
		}
		case USER_ACTIONS.logOut: {
			return (
				{...state, isLoggedIn: false}
			);
		}
		case USER_ACTIONS.updateUser: {
			return (
				{...state, username: action.username}
			);
		}
		default: throw Error(`Action type ${action.type} is not supported`);
	}
};

export const useUser = () => useContext(UserContext);
export const useUserDispatch = () => useContext(UserDispatchContext);