import React from "react";
import "./search.css";
import { connect } from "react-redux";
import {
    inputChangeHandler,
    searchSubmitHandler,
    errorHandler
} from "../../actions/searchActions";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            isSimilarExist: false
        };
    }

    changeHandler = event => {
        this.setState({ inputText: event.target.value });
        this.props.inputChangeHandler(event.target.value);
    };

    submitHandler = event => {
        event.preventDefault();
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${
                this.state.inputText
            }&units=metric&APPID=44d1a43be31df59b32131650f19442b6`
        )
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Город не найден");
            })
            .then(res => {
                this.props.searchSubmitHandler(this.state.inputText, res);
            })
            .catch(error => this.props.errorHandler(error.message));
    };
    clickHandler = event => {
        let city = event.target.textContent;
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=44d1a43be31df59b32131650f19442b6`
        )
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Город не найден");
            })
            .then(res => {
                this.props.searchSubmitHandler(city, res);
            })
            .catch(error => this.props.errorHandler(error.message));
        this.setState({ inputText: city });
    };

    render() {
        return (
            <div className="search-container">
                <form
                    className={
                        this.props.similarCities.length === 0
                            ? "searchfield-container"
                            : "searchfield-container-with-similars"
                    }
                    onSubmit={this.submitHandler}
                >
                    <input
                        type="text"
                        maxLength="31"
                        name="searchField"
                        className="search-input-field"
                        placeholder="Введите название города"
                        value={this.state.inputText}
                        onChange={this.changeHandler}
                        autoComplete="off"
                    />
                    <input
                        type="submit"
                        className="search-submit-btn"
                        value="Поиск"
                    />
                </form>
                <div className="similar-cities-container">
                    {this.props.similarCities.length > 0
                        ? this.props.similarCities.map((city, index) => (
                              <div className="similar-city" key={index}>
                                  <span
                                      className="similar-city-name"
                                      onClick={this.clickHandler}
                                  >
                                      {city}
                                  </span>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        similarCities: state.searchReducer.similarCities
    };
};

export default connect(
    mapStateToProps,
    { inputChangeHandler, searchSubmitHandler, errorHandler }
)(Search);
