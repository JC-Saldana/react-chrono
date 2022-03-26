import './App.css';
import "./styles/style.css"
import React, { Component } from "react"

class App extends Component {

  constructor(props) {
    super(props)
    this.interval = null
  }

  state = {
    seconds: 0,
    minutes: 0,
    isStarted: false,
    splits: []
  }

  initializeCounter() {
    this.interval = setInterval(() => {
      if (this.state.seconds === 60) {
        this.setState((prevState) => ({
          seconds: 0,
          minutes: prevState.minutes + 1,
          isStarted: true
        }));
      } else {
        this.setState((prevState) => ({
          seconds: prevState.seconds + 1,
          isStarted: true
        }));
      }
    }, 1000);
  }

  startCounter = () => {
    if (!this.state.isStarted) {
      this.initializeCounter()
    }
  }

  stopCounter = () => {
    clearInterval(this.interval)
    this.setState({
      isStarted: false
    })
  }

  resetCounter = () => {
    this.setState(() => ({
      seconds: 0,
      minutes: 0,
      isStarted: false,
      splits: []
    }));
  }

  splitCounter = () => {
    this.setState({
      splits: [...this.state.splits, { m: this.state.minutes, s: this.state.seconds }]
    })
  }

  render() {
    return (
      <div className="App">
        <section id="splits-container">
          <h3>Splits</h3>
          <ol id="splits"></ol>
          {this.state.splits.map((s, i) => {
            return <p key={i}>{`${s.m}:${s.s}`}</p>
          })}
        </section>
        <div className="leash leash-top"></div>
        <section id="clock">
          <div id="sphere">
            {this.state.minutes < 10 && <span id="secUni" className="number">0</span>}
            <span id="secUni" className="number">{this.state.minutes}</span>
            <span>:</span>
            {this.state.seconds < 10 && <span id="secUni" className="number">0</span>}
            <span id="secUni" className="number">{this.state.seconds}</span>
            {this.state.isStarted ?
              <>
                <button id="btnRight" className="btn stop" onClick={this.stopCounter}>STOP</button>
                <button id="btnRight" className="btn split" onClick={this.splitCounter}>SPLIT</button>
              </>
              :
              <>
                <button id="btnRight" className="btn start" onClick={this.startCounter}>START</button>
                <button id="btnRight" className="btn reset" onClick={this.resetCounter}>RESET</button>
              </>
            }
          </div>
        </section>
        <div className="leash leash-bottom">
          <div className="hole"></div>
          <div className="hole"></div>
          <div className="hole"></div>
        </div>
      </div>
    )
  }
}

export default App;