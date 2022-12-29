import express, { Request, Response } from 'express';
import config from 'config';

import morgan from 'morgan';
import cors from 'cors';
import connectDb from './utils/connect';
import path from 'path';

const port = config.get<number>('client.port');
const app = express();

// for parsing application/json
app.use(express.json({ limit: '5mb' }));
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// //enabling helmet
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

//enabling cors
app.use(cors());

//enables us to se logs in our terminal
app.use(morgan('common')); //used to log request from the frontend

// //get cookies
// app.use(cookieParser())

/*enabling express to locate static files
app.use(express.static('public')) */

//enabling express to locate static files using virtual path /
app.use('/', express.static(path.join(__dirname, '/public')));

app.listen(port, async () => {
	console.log(`App is running on http://localhost:${port} `);
	await connectDb();
});
