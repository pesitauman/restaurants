import geocode from 'react-geocode';
geocode.setApiKey("AIzaSyCRLCb1n3Kvi4mUh1HLUjopmtg70iWPZk8");

export async function parseData(data) {
  return Promise.all(data.map(async (restaurent) =>({
    ...restaurent,
    address: await locationToAddress(restaurent.Location)
  })));
}

export async function locationToAddress(location) {
  const [lat, lng] = location.split('/', 2);
  if (!lat || !lng) return location;
  const response = await geocode.fromLatLng(parseFloat(lat), parseFloat(lng))
  return response.results[0].formatted_address;
}

export async function addressToLocation(address) {
  const response = await geocode.fromAddress("Eiffel Tower")
  const { lat, lng } = response.results[0].geometry.location;
  return `${lat}/${lng}`;
}