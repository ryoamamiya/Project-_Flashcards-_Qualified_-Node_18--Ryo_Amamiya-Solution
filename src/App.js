import React from 'react'
import Layout from './Layout'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import CreateDeck from './Deck/CreateDeck'
import DeckView from './Deck/DeckView'
import NotFound from './Layout/NotFound'
import EditDeck from './Deck/EditDeck'
import Study from './Study/Study'
import AddCard from './Card/AddCard'
import EditCard from './Card/EditCard'

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/decks/:deckId/study" element={<Study />} />
        <Route path="/decks/new" element={<CreateDeck />} />
        <Route path="/decks/:deckId" element={<DeckView />} />
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
        <Route
          path="/decks/:deckId/cards/:cardId/edit"
          element={<EditCard />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
