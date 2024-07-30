import React from 'react'

function StudyCardBack({ currentCard, handleNext, showNextButton }) {
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">{currentCard.back}</p>
        {showNextButton && (
          <button
            className="btn btn-success"
            type="button"
            style={{ backgroundColor: 'blue' }}
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default StudyCardBack
