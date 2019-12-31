import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
 
class LocationSearchInput extends React.Component {
  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={(address) => this.props.onAddressChange(address)}
        onSelect={(address) => this.props.onAddressChange(address)}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <span>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <ul className="autocomplete-dropdown-container">
              {loading && <li>...</li>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <li
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </li>
                );
              })}
            </ul>
          </span>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;