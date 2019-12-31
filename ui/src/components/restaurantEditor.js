import React from "react";
import LocationSearchInput from './locationSearchInput'
import { connect } from "react-redux";
import {
  updateRestaurant,
  deleteRestaurant,
  resetCurrentRestaurant,
  changeCurrentRestaurant,
 } from '../actions'

class RestaurantEditor extends React.Component {
  render() {
    if(!this.props.restaurant) return '';
    return (
      <div>
      <form>
        <h3>Restaurant Editor</h3>
        <div>
          <label>Name</label>
          <input
            value={this.props.restaurant.Name}
            onChange={(event) => this.props.onPropChange({ Name: event.target.value })}
          />
        </div>
        <div>
          <label>Type</label>
          <input
            value={this.props.restaurant.Type}
            onChange={(event) => this.props.onPropChange({ Type: event.target.value })}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            value={this.props.restaurant.Phone}
            onChange={(event) => this.props.onPropChange({ Phone: event.target.value })}
          />
        </div>
        <div>
          <label>Location</label>
          <LocationSearchInput
            address={this.props.restaurant.address}
            onAddressChange={(address) => this.props.onPropChange({ address })}
          />
        </div>
        <button onClick={(event) => this.props.onUpdate(event, this.props.restaurant)}>Save</button>
        <button onClick={(event) => this.props.onDelete(event, this.props.restaurant)}>Delete</button>
        <button onClick={(event) => this.props.onCancel(event, this.props.restaurant)}>Cancel</button>
      </form>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { restaurant: state.current }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (event, restaurant) => {
      event.preventDefault();
      dispatch(updateRestaurant(restaurant))
    },
    onDelete: (event, restaurant) => {
      event.preventDefault();
      dispatch(deleteRestaurant(restaurant))
    },
    onCancel: (event, restaurant) => {
      event.preventDefault();
      dispatch(resetCurrentRestaurant(restaurant))
    },
    onPropChange: (prop) => {
      dispatch(changeCurrentRestaurant(prop))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEditor);
