var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count:0,
      countdownStatus: 'paused'
    };
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0, countdownStatus: 'paused'});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },

  componentWillUnmount: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },

  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count + 1;
      this.setState({
        count: newCount
      });
//      if (newCount === 0) {
//        this.setState({countdownStatus: 'stopped'});
//      }
    }, 1000);
  },

  handleSetCountdown: function (seconds) {
    this.setState ({
      count: seconds,
      countdownStatus: 'paused'
    });
  },

  handleStatusChange: function (newStatus) {
    this.setState({countdownStatus: newStatus});
  },

  render: function () {
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
//      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
//      } else {
//        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
//      }
    }

    return (
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    )
  }
});

module.exports = Timer;
