import React from "react";
import { connect } from "react-redux";
import { fetchRestaurants, setCurrent } from '../actions'
import { RestaurantItem } from './restaurantItem'

class RestaurantsTable extends React.Component {
  componentDidMount() {
    this.props.onFetch();
  }
  
  render() {
    return (
      <table className="restaurant-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
        {this.props.restaurants && this.props.restaurants.length
          ? this.props.restaurants.map((restaurant) => {
              return (
                <RestaurantItem
                  key={`restaurant-${restaurant.Id}`}
                  restaurant={restaurant}
                  onSetCurrent={this.props.onSetCurrent}
                />
              );
            })
          : <tr><td>No restaurants</td></tr>}
        </tbody>
      </table>

    );
  }
}

const mapStateToProps = (state) => {
  const restaurants = state.restaurants || { data: [] };
  return { restaurants }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetch: () => {
      dispatch(fetchRestaurants());
    },
    onSetCurrent: (restaurant) => {
      dispatch(setCurrent({ restaurant }));
    },
  };
};
// export default restaurantList;
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsTable);
