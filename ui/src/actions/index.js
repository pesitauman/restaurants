import axios from 'axios';
import { parseData, addressToLocation } from '../utils/geoParser'

export function setCurrent(data) {
  return {
    type: 'SET_CURRENT',
    data,
  };
}

export function load(data) {
  return {
    type: 'LOAD',
    data,
  };
}

export function update(data) {
  return {
    type: 'UPDATE',
    data,
  };
}

export function del(data) {
  return {
    type: 'DELETE',
    data,
  };
}

export function resetCurrentRestaurant(data) {
  return {
    type: 'RESET_CURRENT',
    data,
  };
}
export function changeCurrentRestaurant(data) {
  return {
    type: 'CHANGE_CURRENT',
    data,
  };
}

export function fetchRestaurants() {
  return async function(dispatch) {
    const { data } = await axios.get("api/restaurants/");
    dispatch(load(await parseData(data)));
  };
}

export function updateRestaurant(restaurant) {
  return async function(dispatch) {
    restaurant.Location = await addressToLocation(restaurant.address);
    await axios.put(`api/restaurants/${restaurant.Id}`, restaurant)
    dispatch(update({ restaurant }));
  };
}

export function deleteRestaurant(restaurant) {
  return async function(dispatch) {
    await axios.delete(`api/restaurants/${restaurant.Id}`)
    dispatch(del({ Id: restaurant.Id }));
  };
}

export function uploadRestaurants(file) {
  return async function(dispatch) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await axios.post("api/restaurants/upload", formData)
    dispatch(load(await parseData(data)));
  };
}