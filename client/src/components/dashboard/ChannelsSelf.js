import React, { Component } from "react";
import { connect } from "react-redux";

class ChannelSelf extends Component {
  render() {
    const channel = this.props.channel.map((channel) => (
      <tr key={channel._id}>
        <td>{channel.name}</td>
        <td>{channel.date}</td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Subscribed Channels</h4>
        <table className="table table-responsive-sm table-striped table-dark">
          <thead>
            <tr>
              <th>name</th>
              <th>Date</th>
            </tr>
            {channel}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null)(ChannelSelf);
