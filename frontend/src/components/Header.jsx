import { useAuthContext } from '../store/auth-context';

const Header = () => {
  const { token, logout } = useAuthContext();
  return (
    <header className='text-center text-stone-50 p-3'>
      <h1 className='font-mono font-bold text-[clamp(1rem,3vw+1rem,5rem)]'>
        Image GenAI
      </h1>
      {token && (
        <button
          onClick={logout}
          className='mt-2 text-stone-200 hover:text-stone-400'
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
