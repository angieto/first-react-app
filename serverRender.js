// fetch data from the api
import React from 'react';
// to render Reacr components on the server, we need ReactDOMServer package
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const getApiUrl = contestId => {
    if (contestId) {
        return `${config.serverUrl}/api/contests/${contestId}`;
    }
    return `${config.serverUrl}/api/contests`;
};

const getInitialData = (contestId, apiData) => {
    if (contestId) {
        return {
            currentContestId: apiData._id,
            contests: {
                [apiData._id]: apiData
            }
        };
    }
};

const serverRender = (contestId) => {
    axios.get(getApiUrl(contestId))
        .then(res => {
            const initialData = getInitialData(contestId, res.data);
            return {
                // .renderToString(ReactComponent) will read & render everything to string
                // and return a promise
                initialMarkup: ReactDOMServer.renderToString( <App initialData={ initialData } />),
                initialData
            };
        });
};

export default serverRender;