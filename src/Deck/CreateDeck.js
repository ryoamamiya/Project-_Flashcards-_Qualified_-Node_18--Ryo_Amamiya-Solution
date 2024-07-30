import React, { useState } from 'react'
import { createDeck } from '../utils/api'
import { Link, useNavigate } from 'react-router-dom'

function CreateDeck() {
  const navigate = useNavigate()

  const initialFormData = {
    name: '',
    description: '',
  }

  const [deckData, setDeckData] = useState({ ...initialFormData })

  const handleChange = ({ target }) => {
    setDeckData({ ...deckData, [target.name]: target.value })
  }

  const handleSubmit = async (event) => {
    console.log('llega al submit')

    event.preventDefault()

    try {
      const newDeck = await createDeck(deckData)
      navigate(`/decks/${newDeck.id}`)
    } catch (error) {
      console.error(error)
    }
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
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deckData.name}
            placeholder="Deck Name"
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={deckData.description}
            placeholder="Brief description of the deck"
            onChange={handleChange}
            required={true}
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateDeck
