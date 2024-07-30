import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { deleteCard, deleteDeck, readDeck } from '../utils/api'

function DeckView() {
  const deckId = useParams().deckId
  const navigate = useNavigate()
  const [deck, setDeck] = useState([])
  const [cards, setCards] = useState([])

  const { pathname } = useLocation()

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId)
      setDeck(response)
      setCards(response.cards)
    }
    loadDeck()
  }, [deckId])

  const handleDeleteDeck = () => {
    if (
      window.confirm('Delete this deck?\n\nYou will not be able to recover it.')
    ) {
      deleteDeck(deckId)
      navigate('/')
    }
  }

  const handleDeleteCard = (cardId) => {
    if (
      window.confirm('Delete this card?\n\nYou will not be able to recover it.')
    ) {
      deleteCard(cardId)
      // window.location.reload()
      navigate('/')
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'blue' }}>
              <span className="oi oi-home" />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <h3>{deck.name}</h3>
      <p>{deck.description}</p>

      <div className="container d-flex px-0">
        <div className="pr-2">
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
            <span className="oi oi-pencil" />
            Edit
          </Link>
        </div>
        <div className="pr-2">
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
            <span className="oi oi-book" />
            Study
          </Link>
        </div>
        <div>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary">
            <span className="oi oi-plus" style={{ marginRight: '5px' }} />
            Add Cards
          </Link>
        </div>
        <div className="ml-5">
          <button onClick={handleDeleteDeck} className="btn btn-danger">
            <span className="oi oi-trash" />
          </button>
        </div>
      </div>

      <h2>Cards</h2>

      <div>
        {cards.map((card) => {
          return (
            <div key={card.id} className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h6>Question</h6>
                    <p className="card-text">{card.front}</p>
                  </div>
                  <div className="col">
                    <h6>Answer</h6>
                    <p className="card-text">{card.back}</p>
                    <div className="d-flex" style={{ justifyContent: 'right' }}>
                      <div className="pr-2">
                        <Link
                          to={`${pathname}/cards/${card.id}/edit`}
                          className="btn btn-secondary"
                        >
                          <span
                            className="oi oi-pencil"
                            style={{ marginRight: '5px' }}
                          />
                          Edit
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="btn btn-danger"
                        >
                          <span className="oi oi-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DeckView
