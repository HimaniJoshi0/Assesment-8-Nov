import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const getApidata=  async ()=>{
    try{
         const response = await fetch('https://api.tvmaze.com/search/shows?q=all')
         const data = await response.json();
         setShows(data);
    }
    catch{
      console.error('Error fetching data:');
    }
  }

  useEffect(() => {
      getApidata();
  }, []);

  const handleShowClick = (show) => {
    setSelectedShow(show);
  };

  return (
    <div className="app-container">
      <h1>TV Shows</h1>
      <div className="content-container">
        {selectedShow ? (
          <div className="selected-show">
            <h2>{selectedShow.show.name}</h2>
            <div className="summary" dangerouslySetInnerHTML={{ __html: selectedShow.show.summary }}></div>
            {selectedShow.show.image && <img src={selectedShow.show.image.original} alt={selectedShow.show.name} />}
            <button className="back-button" onClick={() => setSelectedShow(null)}>
              Back to List
            </button>
          </div>
        ) : (
          <div className="show-list">
            <h2>List of Shows</h2>
            <ul>
              {shows.map((item) => (
                <li key={item.show.id} className="show-item">
                  {item.show.image && <img src={item.show.image.medium} alt={item.show.name} />}
                  <h3>{item.show.name}</h3>
                  <p>
                    <strong>Language:</strong> {item.show.language}
                  </p>
                  <p>
                    <strong>Genres:</strong> {item.show.genres.join(', ')}
                  </p>
                  <button className="summary-button" onClick={() => handleShowClick(item)}>
                    Show Summary
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;