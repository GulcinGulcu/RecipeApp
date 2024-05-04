import {createContext, useReducer, useContext} from 'react';

export enum USER_ACTIONS  {
	logIn= 'log_in',
	logOut= 'log_out',
	updateUser= 'updated_user',
};

type ACTIONTYPE = {
	type: USER_ACTIONS.logIn | USER_ACTIONS.logOut | USER_ACTIONS.updateUser;
	payload?: string;
}

interface LoggedInValues {
	isLoggedIn?: boolean;
	username?: string;
}

interface ProviderProps {
	children: React.ReactNode;
    initialState: LoggedInValues
}

export const loggedInUser = {
	isLoggedIn: false,
	username: '',
};


export const UserContext = createContext<LoggedInValues | null>(null);
export const UserDispatchContext = createContext<React.Dispatch<ACTIONTYPE>>(() => undefined);

export const UserProvider = ({children, initialState}: ProviderProps) => {
	const [user, dispatch] = useReducer(userReducer, initialState ?? {});

	return (
		<UserContext.Provider value={user}>
			<UserDispatchContext.Provider value={dispatch}>
				{children}
			</UserDispatchContext.Provider>
		</UserContext.Provider>
	)
};

function userReducer (state: LoggedInValues, action: ACTIONTYPE) {
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
				{...state, username: action.payload}
			);
		}
		default:
		 return state;
	}
};

export const useUser = () => useContext(UserContext);
export const useUserDispatch = () => useContext(UserDispatchContext);