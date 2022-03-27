import AuthProvider from "./AuthProvider";
import Container from "./components/Container";

function App() {
  return (
    <AuthProvider>
      <div className="h-screen w-screen bg-gray-100">
        <main className="h-full w-full grid place-items-center">
          <Container />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
