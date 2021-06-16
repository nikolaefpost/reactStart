import logo from './logo.svg';
import './App.css';
import Home from "./components/home";
import NpAreas from "./components/newpost/npAreas";
// import AllModels from "./components/toyota/AllModels";
import Weather from "./components/weather/weather";
import Clock from "./components/Clock/clock";
import AllModels from "./components/toyota/AllModels";
import Sales from "./components/Sales/sales";

function App() {
  return (
    <div className="App">
        <main className="main_weather">
            {/*<AllModels></AllModels>*/}
            <AllModels></AllModels>
            <Sales/>
        </main>
    </div>
  );
}

export default App;
