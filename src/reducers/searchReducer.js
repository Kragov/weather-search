import { SEARCH_SIMILAR, SEARCH_SUBMIT, SEARCH_ERROR } from "../actionTypes";

let defaultState = {
    searchHistory: [],
    similarCities: [],
    weatherData: {},
    currentCity: ""
};

const searchReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SEARCH_SIMILAR:
            let isExistSimilar = false;
            if (payload.length > 0) {
                state.searchHistory.find(item => {
                    if (item[0].toLowerCase() === payload[0].toLowerCase()) {
                        return (isExistSimilar = true);
                    }
                });
            }
            let searchStringLength = payload.length;
            let similarCitiesArray = [];
            if (isExistSimilar) {
                state.searchHistory.forEach(item => {
                    if (item.length >= searchStringLength) {
                        let substring = item.slice(0, searchStringLength);
                        if (substring.toLowerCase() === payload.toLowerCase()) {
                            similarCitiesArray.push(item);
                        }
                    }
                });
            }
            return { ...state, similarCities: similarCitiesArray };
        case SEARCH_SUBMIT:
            let newSearchHistory = state.searchHistory.slice();
            let cityName =
                payload.city[0].toUpperCase() + payload.city.slice(1);
            if (!newSearchHistory.find(city => city === cityName)) {
                newSearchHistory.push(cityName);
            }
            return {
                ...state,
                searchHistory: newSearchHistory,
                weatherData: payload.weather,
                similarCities: [],
                currentCity: cityName
            };
        case SEARCH_ERROR:
            return {
                ...state,
                weatherData: {},
                currentCity: payload
            };
        default:
            return state;
    }
};

export default searchReducer;
