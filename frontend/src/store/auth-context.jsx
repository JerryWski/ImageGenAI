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

function saveToken(token){
  localStorage.setItem('token', token);
  localStorage.setItem('tokenExpiration', new Date(Date.now() + 3600 * 1000).toISOString());
}

const storedToken = localStorage.getItem('token');
const storedTokenExpiration = localStorage.getItem('tokenExpiration');

let initialToken = null;

if(storedToken && new Date(storedTokenExpiration) > new Date()){
  initialToken = storedToken;
}

export function AuthContextProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [token, setToken] = useState(initialToken);

  async function signup(email, password) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        
      },
      credentials: 'include',
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(
        resData.message ||
        'Creating a user failed. Check your credentails please',
      );
    }
    
    setToken(resData.token);
    saveToken(resData.token);
  };

  async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
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
    saveToken(resData.token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  };

  const contextValue = {
    token,
    signup,
    login,
    logout,
  };
  
  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
