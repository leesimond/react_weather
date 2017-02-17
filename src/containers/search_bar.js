import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCities, setCity, getCityWeather } from '../actions/index';
import jsonp from 'jsonp';
const AUTO_COMPLETE_URL = 'http://autocomplete.wunderground.com/aq?query=';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchTerm: '',
      showAutoComplete: true,
    };
  }
  
  // Get cities from API when user stops typing
  getCities = _.debounce((searchTerm) => { 
    jsonp(`${AUTO_COMPLETE_URL}${searchTerm}`, { param: 'cb' }, function (err, data) {
        this.props.getCities(data.RESULTS);
      }.bind(this)); 
    }, 300);
  
  onInputChange(event) {
    this.setState({ showAutoComplete: true });
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
    if (searchTerm != '') {
      this.getCities(searchTerm);
    }
  }
  
  onFormSubmit(event) {
    event.preventDefault();
    this.setState({ showAutoComplete: false });
    // Get cities from API again in case user types faster than auto complete
    jsonp(`${AUTO_COMPLETE_URL}${this.state.searchTerm}`, { param: 'cb' }, function (err, data) {
      this.props.getCities(data.RESULTS);
      const result = this.props.cities[0];
      if (result) {
        let cityMetaData = {};
        cityMetaData.name = result.name;
        cityMetaData.lat = Number(result.lat);
        cityMetaData.lon = Number(result.lon);
        this.props.setCity(cityMetaData);
        this.props.getCityWeather(result.l);
      }
    }.bind(this));
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit.bind(this)} className="input-group">
          <input
            placeholder="Search for a city"
            className="form-control"
            value={this.state.searchTerm}
            onChange={this.onInputChange.bind(this)}
            list="suggestions"/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">Search</button>
          </span>
        </form>
        {this.props.cities && this.props.cities.length > 0 &&
          this.state.searchTerm != '' && this.state.showAutoComplete &&
          <datalist id="suggestions">
            {this.props.cities.map(function(city) {
              return <option key={city.name} value={city.name}/>
            })}
          </datalist>
        }
        {this.props.cities && this.props.cities.length === 0 && !this.state.showAutoComplete &&
          <div className="alert alert-warning" role="alert">
            <strong>Not Found!</strong> Could not find city <strong>{this.state.searchTerm}</strong>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ cities }) {
  return { cities };
}

export default connect(mapStateToProps, { getCities, setCity, getCityWeather })(SearchBar);