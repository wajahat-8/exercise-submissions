import { useState } from 'react'

const Button = (props) => {
  return (<>
    <button onClick={props.onClick}> {props.text}</button>
  </>
  )
}
const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) : 0;
  const positive = total > 0 ? (good / total) * 100 : 0;
  if (total === 0) {
    return <h3>no feedback given</h3>
  }
  return (
    <table>
    <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="total" value={total} />
      <StatisticLine text="average" value={average.toFixed(2)} />
      <StatisticLine text="positive" value={`${positive.toFixed(2)}%`} />
      </tbody>
    </table>
  );
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + bad + neutral;
  const average = total / 3;
  const positive = good / total;
  const handleGood = () => {
    const count = good + 1;
    setGood(count);
  }
  const handleBad = () => {
    const count = bad + 1;
    setBad(count)

  }
  const handleNeutral = () => {
    const count = neutral + 1;
    setNeutral(count)
  }
  return (
    <div>
      <h1>give feedback</h1>

      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App