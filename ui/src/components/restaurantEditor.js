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

  onNameChange = (event) => this.props.onPropChange({ Name: event.target.value });
  onTypeChange = (event) => this.props.onPropChange({ Type: event.target.value });
  onPhoneChange = (event) => this.props.onPropChange({ Phone: event.target.value });
  onAddressChange = (address) => this.props.onPropChange({ address });

  onAnyClick = (event, eventName) => {
    event.preventDefault();
    this.props[eventName](this.props.restaurant)
  }

  onUpdate = (event) => this.onAnyClick(event, 'onUpdate');
  onDelete = (event) => this.onAnyClick(event, 'onDelete');
  onCancel = (event) => this.onAnyClick(event, 'onCancel');

  render() {
    // if(!this.props.restaurant) return '';
    return this.props.restaurant && (
      <div>
      <form>
        <h3>Restaurant Editor</h3>
        <div>
          <label>Name</label>
          <input
            value={this.props.restaurant.Name}
            onChange={this.onNameChange}
          />
        </div>
        <div>
          <label>Type</label>
          <input
            value={this.props.restaurant.Type}
            onChange={this.onTypeChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            value={this.props.restaurant.Phone}
            onChange={this.onPhoneChange}
          />
        </div>
        <div>
          <label>Location</label>
          <LocationSearchInput
            address={this.props.restaurant.address}
            onAddressChange={this.onAddressChange}
          />
        </div>
        <button onClick={this.onUpdate}>Save</button>
        <button onClick={this.onDelete}>Delete</button>
        <button onClick={this.onCancel}>Cancel</button>
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
    onUpdate: (restaurant) => {
      dispatch(updateRestaurant(restaurant))
    },
    onDelete: (restaurant) => {
      dispatch(deleteRestaurant(restaurant))
    },
    onCancel: (restaurant) => {
      dispatch(resetCurrentRestaurant(restaurant))
    },
    onPropChange: (prop) => {
      dispatch(changeCurrentRestaurant(prop))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantEditor);
