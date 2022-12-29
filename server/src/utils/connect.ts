import mongoose from 'mongoose';
import 'colorts/lib/string';
import config from 'config';

const connectDb = async () => {
	const dbUri = config.get<string>('client.dbUri');

	try {
		const connect = await mongoose.connect(dbUri);

		console.log(`MongoDb  connected ${connect.connection.host}`.blue.underline);
	} catch (error: any) {
		console.log(`error :${error.messages}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDb;
