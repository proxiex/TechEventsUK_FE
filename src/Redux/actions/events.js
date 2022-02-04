import { getAllEvents, getOneEvent, getCategories } from '../../api/index';

const getAllEventsAction = (data) => async (dispatch) => {
    dispatch({
        type: 'GET_EVENTS_REQUEST',
    });

    try {
        const event = await getAllEvents(data);
        dispatch({
            type: 'GET_EVENTS_SUCCESS',
            payload: event.data,
        });

    } catch (e) {
        dispatch({
            type: 'ERROR',
            error: e.message,
        });
        return e.message;
    }
};


const getEventDetailAction = (data) => async (dispatch) => {
    dispatch({
        type: 'GET_EVENTS_DETAILS_REQUEST',
    });

    try {
        const event = await getOneEvent(data);
        dispatch({
            type: 'GET_EVENTS_DETAILS_SUCCESS',
            payload: event.data,
        });

    } catch (e) {
        dispatch({
            type: 'ERROR',
            error: e.message,
        });
        return e.message;
    }
};


const getCategoriesAction = (data) => async (dispatch) => {
    dispatch({
        type: 'GET_CATEGORIES_REQUEST',
    });

    try {
        const event = await getCategories(data);
        dispatch({
            type: 'GET_CATEGORIES_SUCCESS',
            payload: event.data,
        });

    } catch (e) {
        dispatch({
            type: 'ERROR',
            error: e.message,
        });
        return e.message;
    }
};

export {
    getAllEventsAction,
    getEventDetailAction,
    getCategoriesAction
}