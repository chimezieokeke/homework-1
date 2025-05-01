import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

class TimersDashboard extends Component {
  state = {
    timers: [
      {
        id: 1,
        title: '100m Race',
        project: 'Nationals',
        elapsed: 0, 
        runningSince: null,
      },
      {
        id: 2,
        title: 'Chief Chimi Haircut Time',
        project: 'Changing the West End',
        elapsed: 0,
        runningSince: null,
      },
    ],
  };

  pad = (numberString, size) => {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  };

  millisecondsToHuman = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      this.pad(hours.toString(), 2),
      this.pad(minutes.toString(), 2),
      this.pad(seconds.toString(), 2),
    ].join(':');

    return humanized;
  };

  renderElapsedString = (elapsed, runningSince) => {
    let totalElapsed = elapsed;
    if (runningSince) {
      totalElapsed += Date.now() - runningSince;
    }
    return this.millisecondsToHuman(totalElapsed);
  };

  handleStartClick = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          return {
            ...timer,
            runningSince: now,
          };
        } else {
          return timer;
        }
      }),
    });
  };

  handleStopClick = (timerId) => {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return {
            ...timer,
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          };
        } else {
          return timer;
        }
      }),
    });
  };

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
            renderElapsedString={this.renderElapsedString}
          />
          <ToggleableTimerForm isOpen={false} />
        </div>
      </div>
    );
  }
}

class EditableTimerList extends Component {
  render() {
    const timers = this.props.timers.map(timer => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        editFormOpen={false}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
        renderElapsedString={this.props.renderElapsedString}
      />
    ));
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

class EditableTimer extends Component {
  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          isRunning={!!this.props.runningSince}
          onStartClick={() => this.props.onStartClick(this.props.id)}
          onStopClick={() => this.props.onStopClick(this.props.id)}
          renderElapsedString={this.props.renderElapsedString}
        />
      );
    }
  }
}

class TimerForm extends Component {
  render() {
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
                {submitText}
              </button>
              <button className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Timer extends Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  render() {
    const elapsedString = this.props.renderElapsedString(
      this.props.elapsed,
      this.props.runningSince
    );
    
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>{elapsedString}</h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <div 
          className='ui bottom attached blue basic button'
          onClick={this.props.isRunning ? this.handleStopClick : this.handleStartClick}
        >
          {this.props.isRunning ? 'Stop' : 'Start'}
        </div>
      </div>
    );
  }
}

class ToggleableTimerForm extends Component {
  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon'>
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

export default TimersDashboard;