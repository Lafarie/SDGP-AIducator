import React, { useState } from "react";
import { Navbar } from './App';
import './index.css';
import './AIAssistant.css';
import './App.css';
import './3DLibrary.css';

const cardData = [
  { id: 1, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 1', description: 'Description for card 1' },
  { id: 2, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 2', description: 'Description for card 2' },
  { id: 3, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 1', description: 'Description for card 1' },
  { id: 4, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 2', description: 'Description for card 2' },
  { id: 5, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 1', description: 'Description for card 1' },
  { id: 6, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 2', description: 'Description for card 2' },
  { id: 7, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 1', description: 'Description for card 1' },
  { id: 8, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 2', description: 'Description for card 2' },
  { id: 9, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 1', description: 'Description for card 1' },
  { id: 10, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 2', description: 'Description for card 2' },
  { id: 11, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 1', description: 'Description for card 1' },
  { id: 12, image: 'https://img-new.cgtrader.com/items/2775031/c6a5901f5d/grid/craft-pots-3d-model-obj-fbx-stl.jpg',title: 'Card 2', description: 'Description for card 2' },
  

];

function Library() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(cardData.length / cardsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? totalPages : currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="body">
        <h1>3D models</h1>
        <div className="grid-container">
          {currentCards.map(card => (
            <Card key={card.id} data={card} />
          ))}
        </div>
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={prevPage}>Previous</button>
          )}
          <span>{currentPage} of {totalPages}</span>
          {currentPage < totalPages && (
            <button onClick={nextPage}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

const Card = ({ data }) => {
  return (
    <div className="card">
       <img src={data.image} alt={data.title}/>
       <div className="container">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
      </div>
    </div>
  );
}

function load(){
  return (
    <div>
      <Navbar />
      <div id={"models"} className={'frames'}></div>
      <div><h1>CART</h1>
      <div className="cart">
        <div className="grid-container">
          {currentCards.map(card => (
            <Card key={card.id} data={card} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

function Suggestions(){
  return(
    <div className="grid-container">
          {currentCards.map(card => (
            <Card key={card.id} data={card} />
          ))}
    </div>
  )
}

function cart(){
  return (
    <div>
      <Navbar />
      <div id={"models"} className={'frames'}></div>
      <div><h1>CART</h1>
      <div className="cart">

      </div>
      </div>
    </div>
  );
}
export default Library;
