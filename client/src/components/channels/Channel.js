import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Channel from "./Channels";
import Spinner from "../common/Spinner";
import { getChannels } from "../../actions/channelActions";
import "../../App.css";

class Channels extends Component {
  componentDidMount() {
    this.props.getChannels();
  }

  render() {
    const { channels, loading } = this.props.channel;
    let petChannels;

    if (channels === null || loading) {
      petChannels = <Spinner />;
    } else {
      petChannels = <Channel channels={getChannels} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{petChannels}</div>
          </div>
        </div>
      </div>
    );
  }
}

Channels.propTypes = {
  getChannels: PropTypes.func.isRequired,
  channel: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  channel: state.channel,
});

export default connect(mapStateToProps, { getChannels })(Channels);
