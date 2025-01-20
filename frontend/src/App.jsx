import AuthForm from "./components/AuthForm";
import Header from "./components/Header";
import { AuthContextProvider } from "./store/auth-context.jsx";

function App() {
  return (
    <AuthContextProvider>
    <div className="min-h-screen py-8">
      <Header />
      <main className="mt-12 text-stone-50">
        <AuthForm />
      </main>
    </div>
    </AuthContextProvider>
  );
}

export default App;
