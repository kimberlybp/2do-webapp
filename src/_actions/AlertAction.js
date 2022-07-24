import { actions } from '../utils/constants/actions';

export function successAlert(title, message, autoHideDuration) {
    return ({
        type: actions.ALERT_SUCCESS,
        payload: { title: title, message: message, autoHideDuration: autoHideDuration }
    });
}

export function errorAlert(title, message, autoHideDuration) {
    return ({
        type: actions.ALERT_ERROR,
        payload: { title: title, message: message, autoHideDuration: autoHideDuration }
    });
}

export function warningAlert(title, message, autoHideDuration) {
    return ({
        type: actions.ALERT_WARNING,
        payload: { title: title, message: message, autoHideDuration: autoHideDuration }
    });
}

export function infoAlert(title, message, autoHideDuration) {
    return ({
        type: actions.ALERT_INFO,
        payload: { title: title, message: message, autoHideDuration: autoHideDuration }
    });
}

export function closeAlert() {
    return { 
        type: actions.ALERT_CLOSE
    }
}