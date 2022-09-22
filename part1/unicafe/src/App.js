import { useState } from 'react'

const App = () => {

  const [reviews, setReviews] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGood = () => {
    const newReviews = {
      ...reviews,
      good: reviews.good + 1
    }
    setReviews(newReviews)
  }

  const handleBad = () => {
    const newReviews = {
      ...reviews,
      bad: reviews.bad + 1
    }
    setReviews(newReviews)
  }

  const handleNeutral = () => {
    const newReviews = {
      ...reviews,
      neutral: reviews.neutral + 1
    }
    setReviews(newReviews)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics allReviews={reviews} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = ({ allReviews }) => {
  const total = allReviews.good + allReviews.neutral + allReviews.bad
  const average = ((allReviews.good * 1) + (allReviews.bad * -1)) / total
  const positive = ((allReviews.good) / total) * 100

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={allReviews.good} />
          <StatisticsLine text="neutral" value={allReviews.neutral} />
          <StatisticsLine text="bad" value={allReviews.bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  )

}

const StatisticsLine = ({ text, value }) => {
  if ('positive' === text) {
    return (
      <tr>
        <td>
          {text} {value}%
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  )
}

export default App