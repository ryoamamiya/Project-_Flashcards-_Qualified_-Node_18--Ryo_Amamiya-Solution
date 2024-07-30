import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudyCardFront from './StudyCardFront'
import StudyCardBack from './StudyCardBack'
import './Study.css'

function StudyCard({ currentCard, setCurrentCard, cards }) {
  const navigate = useNavigate()
  const [cardNum, setCardNum] = useState(1)
  const [frontOfCard, setFrontOfCard] = useState(true)
  const [flipped, setFlipped] = useState('')

  const handleFlip = () => {
    if (frontOfCard) {
      setFrontOfCard(false)
      setFlipped('flipped')
    } else {
      setFrontOfCard(true)
      setFlipped('')
    }
  }

  const handleNext = () => {
    if (cardNum < cards.length) {
      setCurrentCard(cards[cardNum])
      setFrontOfCard(true)
      setFlipped('')
      setCardNum(cardNum + 1)
    } else if (
      window.confirm(
        "Restart Cards?\n\nClick 'cancel' to return to the home page."
      )
    ) {
      setCurrentCard(cards[0])
      setFrontOfCard(true)
      setFlipped('')
      setCardNum(1)
    } else {
      navigate('/')
    }
  }

  return (
    <div>
      <div className={flipped}>
        <div className="front">
          <StudyCardFront
            cardNum={cardNum}
            cards={cards}
            currentCard={currentCard}
            handleFlip={handleFlip}
          />
        </div>
        <div className="back">
          <StudyCardBack
            cardNum={cardNum}
            cards={cards}
            currentCard={currentCard}
            handleFlip={handleFlip}
            handleNext={handleNext}
            showNextButton={!frontOfCard}
          />
        </div>
      </div>
    </div>
  )
}

export default StudyCard
