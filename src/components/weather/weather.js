import React from "react";
import { connect } from "react-redux";

import "./weather.css";

class Weather extends React.Component {
    render() {
        return (
            <>
                {this.props.currentCity !== "Город не найден" ? (
                    <div className="weather-container">
                        <h2>{this.props.currentCity}</h2>
                        <h3>
                            <img
                                src={`http://openweathermap.org/img/w/${
                                    this.props.weather.weather[0].icon
                                }.png`}
                                alt="weather icon"
                            />
                            <span>{this.props.weather.weather[0].main}</span>
                            <span>, {this.props.weather.main.temp}°C</span>
                        </h3>
                        {this.props.weather.visibility ? (
                            <p>
                                Видимость: {this.props.weather.visibility}{" "}
                                метров
                            </p>
                        ) : null}
                        <p>
                            Скорость ветра: {this.props.weather.wind.speed} м/с
                        </p>
                    </div>
                ) : (
                    <h2 className="error">{this.props.currentCity}</h2>
                )}
            </>
        );
    }
}

let mapStateToProps = state => {
    return {
        currentCity: state.searchReducer.currentCity,
        weather: state.searchReducer.weatherData
    };
};

export default connect(
    mapStateToProps,
    null
)(Weather);
