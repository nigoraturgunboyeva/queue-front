import "./All.css"
import Home from "./Home/Home";
import Navabar from "./Pages/Navbar/Navabar";
function App() {

  return (
   <div>
      <Navabar/>
      <div className="container">
      <Home/>
      </div>
   </div>
  );
}

export default App;
