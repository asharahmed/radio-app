import React from 'react';
import { Parser } from 'icecast-parser';
import 'bootstrap/dist/css/bootstrap.min.css';



class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamUrl: '',
      streamTitle: '',
      isPlaying: false,
    };
  }

  componentDidMount() {
    const streamUrl = 'http://streaming.radionomy.com/JamendoLounge';
    this.setState({
      streamUrl: streamUrl,
      isPlaying: true,
    });
    this.setupIcecast(streamUrl);
  }

  setupIcecast(streamUrl) {
    const radioStation = new Parser(streamUrl);
    radioStation.on('metadata', (metadata) => {
      this.setState({
        streamTitle: metadata.StreamTitle,
      });
    });
  }

  handlePlay() {
    const audioElement = document.getElementById('audio');
    audioElement.play();

    this.setState({
      isPlaying: true,
    });
  }

  handlePause() {
    const audioElement = document.getElementById('audio');
    audioElement.pause();

    this.setState({
      isPlaying: false,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-12 col-md-6 offset-md-3">
            <h1 className="text-center">Radio</h1>
            <div className="text-center">
              <p className="lead">
                Click the buttons below to play or pause the radio
              </p>
            </div>
            <div className="text-center">
              <p className="lead">
                Is Playing: {this.state.isPlaying ? 'Yes' : 'No'}
              </p>
              <p className="lead">StreamURL: JamendoLounge</p>
              <audio
                id="audio"
                src={this.state.streamUrl}
                autoPlay={this.state.isPlaying}
              />
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-success mr-2"
                onClick={this.handlePlay.bind(this)}
                disabled={this.state.isPlaying}
              >
                Play
              </button>
              <br/>
              <br/>
              <button
                className="btn btn-danger"
                onClick={this.handlePause.bind(this)}
                disabled={!this.state.isPlaying}
              >
                Pause
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="lead">Stream Title: {this.state.streamTitle}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Radio;
