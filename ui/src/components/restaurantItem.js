import React from "react";

export class RestaurantItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.restaurant.Name} </td>
        <td>{this.props.restaurant.Type} </td>
        <td>{this.props.restaurant.Phone} </td>
        <td>{this.props.restaurant.address} </td>
        <td>
          <input
            type='button'
            value='edit'
            onClick={() => this.props.onSetCurrent(this.props.restaurant)}
          />
        </td>
      </tr>
    )
  }
}