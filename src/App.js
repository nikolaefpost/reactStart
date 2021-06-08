import logo from './logo.svg';
import './App.css';
import Home from "./components/home";
import NpAreas from "./components/newpost/npAreas";
// import AllModels from "./components/toyota/AllModels";
import Weather from "./components/weather/weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <main className="main_weather">
            {/*<AllModels></AllModels>*/}
            <Weather></Weather>
        </main>
    </div>
  );
}

export default App;
