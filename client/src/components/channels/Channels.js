import React, { Component } from "react";
import PropTypes from "prop-types";
import ChannelItem from "./ChannelItem";

class Channel extends Component {
  render() {
    const { channels } = this.props;

    return channels.map((channel) => (
      <ChannelItem key={channel._id} channel={channel} />
    ));
  }
}

Channel.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default Channel;
