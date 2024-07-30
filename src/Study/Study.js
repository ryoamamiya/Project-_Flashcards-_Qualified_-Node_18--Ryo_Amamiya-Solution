import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck } from '../utils/api'
import StudyCard from './StudyCard'

function Study() {
  const deckId = useParams().deckId
  const [deck, setDeck] = useState({})
  const [cards, setCards] = useState([])
  const [currentCard, setCurrentCard] = useState({})

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId)
      setDeck(response)
      setCards(response.cards)
      setCurrentCard(response.cards[0])
    }
    loadDeck()
  }, [deckId])

  if (cards.length > 2) {
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
            <li className="breadcrumb-item" style={{ color: 'blue' }}>
              {deck.name}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>

        <h2>Study: {deck.name}</h2>
        <StudyCard
          currentCard={currentCard}
          setCurrentCard={setCurrentCard}
          cards={cards}
        />
      </div>
    )
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
          <li className="breadcrumb-item" style={{ color: 'blue' }}>
            {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cards.length} cards in
        this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-secondary">
        <span className="oi oi-plus" />
        Add Cards
      </Link>
    </div>
  )
}

export default Study
