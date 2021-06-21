import './App.css';
import Header from "./components/Header/Header"
// import BasicTextFields from './components/Body/BasicTextFields';
import ItemListing from './components/Body/ItemListing';

function App() {

  return (
    <div className="App">
      <Header />
      {/* <BasicTextFields /> */}
      <ItemListing />
    </div>
  );
}

export default App;
