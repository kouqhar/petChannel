import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { joinChannel } from "../../actions/channelActions";

class ChannelItem extends Component {
  onJoinClick(id) {
    this.props.joinChannel(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { channel, showActions } = this.props;

    return (
      <div className="card card-body mb-3 text-white bg-dark">
        <div className="row">
          <div className="col-md-10">
            <p className="lead text-left">{channel.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onJoinClick.bind(this, channel._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(channel.likes),
                    })}
                  ></i>
                  <span className="badge badge-light">
                    {channel.likes.length}
                  </span>
                </button>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ChannelItem.defaultProps = {
  showActions: true,
};

ChannelItem.propTypes = {
  joinChannel: PropTypes.func.isRequired,
  channel: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { joinChannel })(ChannelItem);
