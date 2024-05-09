import { createContext, useReducer, useContext } from 'react';

export enum USER_ACTIONS {
  logIn = 'log in',
  logOut = 'log out',
  updateUser = 'update user',
  updatePassword = 'update password',
}

type ACTIONTYPE = {
  type: USER_ACTIONS;
  username?: string;
  password?: string;
};

interface LoggedInValues {
  isLoggedIn?: boolean;
  username?: string;
  password?: string;
}

interface ProviderProps {
  children: React.ReactNode;
  initialState: LoggedInValues;
}

export const loggedInUser = {
  isLoggedIn: false,
  username: '',
  password: '',
};

export const UserContext = createContext<LoggedInValues>(loggedInUser);
export const UserDispatchContext = createContext<React.Dispatch<ACTIONTYPE>>(
  () => undefined,
);

export const UserProvider = ({ children, initialState }: ProviderProps) => {
  const [user, dispatch] = useReducer(userReducer, initialState ?? {});

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

function userReducer(state: LoggedInValues, action: ACTIONTYPE) {
  switch (action.type) {
    case USER_ACTIONS.logIn: {
      return { ...state, isLoggedIn: true };
    }
    case USER_ACTIONS.logOut: {
      return { ...state, isLoggedIn: false };
    }
    case USER_ACTIONS.updateUser: {
      return { ...state, username: action.username };
    }
    case USER_ACTIONS.updatePassword: {
      return { ...state, password: action.password };
    }
    default:
      return state;
  }
}

export const useUser = () => useContext(UserContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
