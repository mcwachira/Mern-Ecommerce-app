import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
	email: string;
	name: string;
	password: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;

	//returns a promise of type boolean
	comparePassword(candidatePassword: string): Promise<Boolean>;
}
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			require: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	} //enable us to get time for user created or updated
);

//pre save hook to check fro the password
userSchema.pre('save', async function (next) {
	let user = this as UserDocument;

	if (!user.isModified('password')) {
		return next();
	}

	const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

	const hash = await bcrypt.hashSync(user.password, salt);

	user.password = hash;

	return next();
});

//compare password with hash when logging in
userSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
