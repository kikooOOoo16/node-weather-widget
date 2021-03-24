formatErrMessage = (code) => {
    switch (code) {
        case 'ENOTFOUND':
            return 'Could not connect to the API service.';
        case 615 :
        case 'Not Found':
        case '':
            return 'Couldn\'t find the requested location, please try again.';
        case 601:
            return 'Please add a valid location.';
        default:
            return 'An unknown error occurred.';
    }
}

module.exports = formatErrMessage;
