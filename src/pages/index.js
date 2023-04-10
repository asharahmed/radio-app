import React, { Component } from 'react';
import Radio from './radio';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
    this.handleDarkModeChange = this.handleDarkModeChange.bind(this);
  }

  componentDidMount() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', this.handleDarkModeChange);
    this.handleDarkModeChange(darkModeQuery);
  }

  componentWillUnmount() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.removeEventListener('change', this.handleDarkModeChange);
  }

  handleDarkModeChange(e) {
    this.setState({ darkMode: e.matches });
  }

  render() {
    const { darkMode } = this.state;

    return (
      <div className={`container${darkMode ? '-dark' : ''}`}>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <h1 className="text-center">Welcome to my internet radio app</h1>
            <p className="text-center">
              Click the button below to listen to the radio.
            </p>
            <Radio />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
