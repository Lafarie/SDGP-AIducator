import React from 'react';
import Navbar from './component/Navbar';
import Assistant from './AIAssistant';


function Home() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Assistant></Assistant>
    </div>
  );
}

export default Home;
