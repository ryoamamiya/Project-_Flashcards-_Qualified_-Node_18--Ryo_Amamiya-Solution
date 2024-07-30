import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { readCard, readDeck, updateCard } from '../utils/api'
import CardForm from './CardForm'

function EditCard() {
  const navigate = useNavigate()
  const cardId = useParams().cardId
  const deckId = useParams().deckId

  const [deck, setDeck] = useState('')

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId)
      setDeck(response)
    }
    loadDeck()
  }, [deckId])

  const [cardData, setCardData] = useState('')
  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId)
      setCardData(response)
    }
    loadCard()
  }, [cardId])

  const handleChange = ({ target }) => {
    setCardData({ ...cardData, [target.name]: target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateCard(cardData)
    navigate(`/decks/${deckId}`)
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'blue' }}>
              <span className="oi oi-home" style={{ marginRight: '5px' }} />
              Home
            </Link>
          </li>
          <li className="breadcrumb-item" style={{ color: 'blue' }}>
            {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>

      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deckId={deckId}
        valueFront={cardData.front}
        valueBack={cardData.back}
        secondaryButton="Cancel"
        primaryButton="Save"
      />
    </div>
  )
}

export default EditCard
