import logo from './logo.svg';
import './App.css';
import Home from "./components/home";
import NpAreas from "./components/newpost/npAreas";
import AllModels from "./toyota/AllModels";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <main>
            <AllModels></AllModels>
        </main>
    </div>
  );
}

export default App;
