import { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  token: null,
  signup: (email, password) => {},
  login: (email, password) => {},
  logut: () => {},
});

export function useAuthContext() {
  const authCtx = use(AuthContext);

  if (!authCtx) {
    throw new Error('useAuthContext must be used within AuthContext Provider');
  }
  return authCtx;
}

export function AuthContetProvider({ children }) {
  const [token, setToken] = useState();

  const signup = async (email, password) => {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await response.json();
    if (!response.ok) {
      throw new Error(
        resData.message ||
          'Creating a user failed. Check your credentails please',
      );
    }

    setToken(resData.token);
  };
  const login = (email, password) => {};
  const logout = () => {};

  const contextValue = {
    token,
    signup,
    login,
    logout,
  };
  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
