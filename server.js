import config from './config';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import serverRender from './serverRender';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// transform sass to css: find files from src, output at dest
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));

app.use('/api', apiRouter);

app.set('view engine', 'ejs');

app.get(['/', '/contest/:contestId'], (req, res) => {
    serverRender(req.params.contestId).then(( {initialMarkup, initialData} ) => {
        res.render('index', {
            initialMarkup,
            initialData
        });
    }).catch(err => {
        console.error(err);
        res.status(404).send('Bad request');
    });
});

app.listenerCount(config.port, config.host, () => {
    console.info("Express is listening on port", config.port);
});