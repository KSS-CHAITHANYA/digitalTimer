import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    seconds: 0,
    plusMinus: 25,
    play: false,
    isRunning: false,
  }

  onDecrement = () => {
    this.setState(prevState => ({
      plusMinus: prevState.plusMinus - 1,
      minutes: prevState.plusMinus - 1,
    }))
  }

  onIncrement = () => {
    this.setState(prevState => ({
      plusMinus: prevState.plusMinus + 1,
      minutes: prevState.plusMinus + 1,
    }))
  }

  decrementByOne = () => {
    this.setState(prevState => {
      if (prevState.seconds <= 0) {
        return {seconds: 59, minutes: prevState.minutes - 1}
      }
      if (prevState.minutes <= 0 && prevState.seconds <= 0) {
        this.resetTheTimer()
        return null
      }
      return {seconds: prevState.seconds - 1}
    })
  }

  togglePlayPause = () => {
    this.setState(prevState => ({
      play: !prevState.play,
      isRunning: true,
    }))
    const {play} = this.state
    if (play) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.decrementByOne, 1000)
    }
  }

  resetTheTimer = () => {
    this.setState({
      isRunning: false,
      play: false,
      seconds: 0,
      plusMinus: 25,
      minutes: 25,
    })
    clearInterval(this.timerId)
  }

  render() {
    const {seconds, plusMinus, play, isRunning, minutes} = this.state
    const playPauseImage = play
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playPauseAlt = play ? `pause icon` : `play icon`
    const pausedRunning = play ? 'Running' : 'Paused'

    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    const timerLimit = `${formattedMinutes}:${formattedSeconds}`

    return (
      <div className="main-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="image-container">
            <h2 className="timer-limit">{timerLimit}</h2>
            <p>{pausedRunning}</p>
          </div>
          <div className="right-container">
            <div className="play-reset-containers">
              <div className="button-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.togglePlayPause}
                >
                  <img
                    src={playPauseImage}
                    alt={playPauseAlt}
                    className="play-rest-buttons"
                  />
                </button>
                <button type="button" onClick={this.togglePlayPause}>
                  {play ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="button-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.resetTheTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-rest-buttons"
                  />
                </button>
                <p>Reset</p>
              </div>
            </div>
            <div>
              <p>Set Timer Limit</p>
              <div className="increaseDecrease">
                <button
                  type="button"
                  onClick={isRunning ? undefined : this.onDecrement}
                  className="decrease-button"
                >
                  -
                </button>
                <p>{plusMinus}</p>
                <button
                  type="button"
                  onClick={isRunning ? undefined : this.onIncrement}
                  className="decrease-button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
