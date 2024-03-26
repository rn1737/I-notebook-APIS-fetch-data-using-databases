import './App.css'; 
import{ 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from "react-router-dom"; 
import Navbar from './components/Navbar'; 
function App() {
  return (
    <> 
    <Navbar/> 

      <h1>This is iNotebook</h1> 
    </>
  );
}

export default App;
