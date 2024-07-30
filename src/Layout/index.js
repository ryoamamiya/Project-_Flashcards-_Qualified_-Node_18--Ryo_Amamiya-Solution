import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
import { deleteDeck, listDecks } from '../utils/api'

function Layout() {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks()
      setDecks(response)
    }
    loadDecks()
  }, [])

  const handleDeleteDeck = (deckId) => {
    if (
      window.confirm('Delete this deck?\n\nYou will not be able to recover it.')
    ) {
      deleteDeck(deckId)
      window.location.reload()
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <Link to={'/decks/new'} className="btn btn-secondary">
          <span className="oi oi-plus" /> Create Deck
        </Link>

        <div>
          {decks.map((deck) => {
            return (
              <div key={deck.id} className="card">
                <h5 className="card-header">{deck.name}</h5>
                <div className="card-body">
                  <h3 className="card-title">{deck.cards.length} cards</h3>
                  <p className="card-text">{deck.description}</p>
                  <div className="d-flex">
                    <div className="pr-2">
                      <Link
                        to={`/decks/${deck.id}`}
                        className="btn btn-secondary"
                      >
                        <span className="oi oi-eye" />
                        View
                      </Link>
                    </div>
                    <div>
                      <Link
                        to={`/decks/${deck.id}/study`}
                        className="btn btn-primary"
                      >
                        <span
                          className="oi oi-book"
                          style={{ marginRight: '5px' }}
                        />
                        Study
                      </Link>
                    </div>
                    <div className="ml-auto">
                      <button
                        onClick={() => handleDeleteDeck(deck.id)}
                        className="btn btn-danger"
                      >
                        <span className="oi oi-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Layout
