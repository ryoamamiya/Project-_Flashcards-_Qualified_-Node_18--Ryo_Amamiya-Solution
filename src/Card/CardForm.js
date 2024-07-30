import React from 'react'
import { useNavigate } from 'react-router-dom'

function CardForm({
  handleSubmit,
  handleChange,
  deckId,
  valueFront,
  valueBack,
  primaryButton,
  secondaryButton,
}) {
  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          placeholder="Front side of card"
          required={true}
          style={{ height: '150px' }}
          onChange={handleChange}
          value={valueFront}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          placeholder="Back side of card"
          required={true}
          style={{ height: '150px' }}
          onChange={handleChange}
          value={valueBack}
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary btn-lg"
        style={{ marginRight: '10px', marginBottom: '20px' }}
        onClick={() => navigate(`/decks/${deckId}`)}
      >
        {secondaryButton}
      </button>
      <button
        type="Submit"
        className="btn btn-primary btn-lg"
        style={{ marginBottom: '20px' }}
      >
        {primaryButton}
      </button>
    </form>
  )
}

export default CardForm
