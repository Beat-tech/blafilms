import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const [searchResult, setSearchResult] = useState()
  const [titleSearch, setTitleSearch] = useState ('king')
  const [pageChange, setPageChange] = useState (1)


 useEffect(() => {
    const search = async () => {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&s=${titleSearch}&page=${pageChange}`,
      )

      const data = await response.json()
      setSearchResult (data)

     
    }

    search()
    
  },[titleSearch, pageChange])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.target.title.value !==''){
    setTitleSearch(e.target.title.value)}
  
  };

  const handleClickPrevious = () => {
    if (pageChange>1) {
    setPageChange(pageChange-1)}
  }

  const handleClickNext = (e) => {
    setPageChange (pageChange+1)
  }
  return (
    <div className="App">
      
        <form  className="search" onSubmit= {handleSubmit}>
        <input name="title" type="text" placeholder="Search..." />
        <input className="button" value="Search" type="submit"></input>
        </form>
     
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron" onClick= {handleClickPrevious}>
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron" onClick={handleClickNext}>
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
