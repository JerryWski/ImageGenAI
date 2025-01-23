import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Gallery from './components/Gallery';
import { useAuthContext } from './store/auth-context';
import ImageGeneration from './components/ImageGeneration';

function App() {
  const { token } = useAuthContext();

  return (
    <div className='min-h-screen py-8'>
      <Header />
      <main className='mt-12 text-stone-50'>
       {!token ? <AuthForm /> : <ImageGeneration/>}
       <Gallery/>
      </main>
    </div>
  );
}

export default App;
