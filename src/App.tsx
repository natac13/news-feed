import React from 'react'
import NewsFeed from './NewsFeed'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo News Feed</h1>
        <p>by: Sean Campbell</p>
      </header>
      <main className="news">
        <NewsFeed />
      </main>
    </div>
  )
}

export default App
