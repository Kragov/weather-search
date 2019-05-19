import { SEARCH_SIMILAR, SEARCH_SUBMIT, SEARCH_ERROR } from "../actionTypes";

export const inputChangeHandler = value => {
    return {
        type: SEARCH_SIMILAR,
        payload: value
    };
};

export const searchSubmitHandler = (city, weather) => {
    return {
        type: SEARCH_SUBMIT,
        payload: { weather: weather, city: city }
    };
};

export const errorHandler = message => {
    return {
        type: SEARCH_ERROR,
        payload: message
    }
}