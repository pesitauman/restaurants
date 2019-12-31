import React from "react";
import { connect } from "react-redux";
import { uploadRestaurants } from '../actions'

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    }
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0],
    })
  }
  
  render() {
    return (
      <div>
        <input
          className="restaurant-input"
          type="file"
          onChange={this.onFileChange}
        />
        <input
          type="button"
          value="Upload"
          onClick={() => this.props.onUpload(this.state.file)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpload: (file) => {
      dispatch(uploadRestaurants(file))
    },
  };
};
// export default restaurantList;
export default connect(null, mapDispatchToProps)(Uploader);
