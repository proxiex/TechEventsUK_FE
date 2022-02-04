const initialState = {
    loading: false,
    searchLoading: false,
    detailsLoading: false,
    events: [],
    category: [],
    details: {},
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_EVENTS_REQUEST':
            return {
                ...state,
                loading: true,
            }

        case 'GET_EVENTS_SUCCESS':
            return {
                ...state,
                loading: false,
                events: action?.payload?.data?.events,
            }

        case 'GET_SEARCH_EVENTS_REQUEST':
            return {
                ...state,
                searchLoading: true,
            }

        case 'GET_SEARCH_EVENTS_SUCCESS':
            return {
                ...state,
                searchLoading: false,
                events: action.payload,
            }

        case 'GET_EVENTS_DETAILS_REQUEST':
            return {
                ...state,
                detailsLoading: true,
            }

        case 'GET_EVENTS_DETAILS_SUCCESS':
            return {
                ...state,
                detailsLoading: false,
                details: action.payload?.data?.event,
            }

        case 'GET_CATEGORIES_SUCCESS':
            return {
                ...state,
                category: action.payload?.data?.categories,
            }

        default:
            return state;
    }
}

export { eventsReducer };
