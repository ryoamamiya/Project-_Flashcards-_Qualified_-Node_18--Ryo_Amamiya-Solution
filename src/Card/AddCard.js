import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { createCard, readDeck } from '../utils/api'
import CardForm from './CardForm'

function AddCard() {
  const deckId = useParams().deckId
  const [deck, setDeck] = useState('')

  const initialFormData = {
    front: '',
    back: '',
  }
  const [cardData, setCardData] = useState({ ...initialFormData })

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId)
      setDeck(response)
    }
    loadDeck()
  }, [deckId])

  const handleChange = ({ target }) => {
    setCardData({ ...cardData, [target.name]: target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const abortController = new AbortController()
    async function newCard() {
      try {
        const response = await createCard(
          deckId,
          cardData,
          abortController.signal
        )
        console.log(response)
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted')
        } else {
          throw error
        }
      }
    }
    newCard()
    setCardData({ ...initialFormData })
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'blue' }}>
              <span
                className="oi oi-home"
                style={{ marginRight: '5px', color: 'blue' }}
              />
              Home
            </Link>
          </li>
          <li
            className="breadcrumb-item"
            aria-current="page"
            style={{ color: 'blue' }}
          >
            {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <CardForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deckId={deckId}
        valueFront={cardData.front}
        valueBack={cardData.back}
        secondaryButton="Done"
        primaryButton="Save"
      />
    </div>
  )
}

export default AddCard
