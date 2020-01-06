import React from "react";
import { connect } from "react-redux";
import { filterRestaurants, setVisibilityFilter } from '../actions'

class Filter extends React.Component {

  onFilterChange = (event) => this.props.onFilterChange(event.target.value);
  onSearch = () => this.props.onSearch(this.props.visibilityFilter);
  
  render() {
    return (
      <div>
        <input
          className="restaurant-filter"
          value={this.props.visibilityFilter}
          onChange={this.onFilterChange}
        />
        <input
          type="button"
          value="Search"
          onClick={this.onSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { visibilityFilter: state.visibilityFilter }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (keyword) => {
      dispatch(filterRestaurants(keyword));
    },
    onFilterChange: (keyword) => {
      dispatch(setVisibilityFilter({ filter: keyword }))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
