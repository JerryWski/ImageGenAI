import { createContext, useState, use } from 'react';

const AuthContext = createContext({
  token:null,
  signup:(email, password) => {},
  login:(email, password) => {},
  logout:() => {},
})

export function useAuthContext() {
  const authCtx = use(AuthContext);

  if (!authCtx) {
    throw new Error('useAuthContext must be used within AuthContext Provider');
  }
  return authCtx; 
}

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

  async function signup(email, password) {
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

  async function login(email, password) {
    const response = await fetch('http://localhost:3000/login', {
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
          'Logging failed. Check your credentails please',
      );
    }

    setToken(resData.token);
  };

  const logout = () => {};

  const contextValue = {
    token,
    signup,
    login,
    logout,
  };
  
  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
