import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api'

function EditDeck() {
  const deckId = useParams().deckId
  const navigate = useNavigate()
  const [deck, setDeck] = useState('')

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId)
      setDeck(response)
    }
    loadDeck()
  }, [deckId])

  const handleChange = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    updateDeck(deck).then(navigate(`/decks/${deck.id}`))
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
            Edit Deck
          </li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder={deck.name}
            value={`${deck.name}`}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            placeholder={deck.description}
            value={deck.description}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </button>
        <button
          type="Submit"
          className="btn btn-primary btn-lg"
          style={{ marginBottom: '20px' }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditDeck
