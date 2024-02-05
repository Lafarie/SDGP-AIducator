
import './App.css';
import Navbar from './components/Navbar';
import Assistant from './Pages/AIAssistant';



function Home() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Assistant></Assistant>
    </div>
  );
}

export default Home;
