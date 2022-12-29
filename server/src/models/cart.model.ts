import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface CartDocument extends mongoose.Document {
	user: UserDocument['_id'];
	productId: string;
	name: string;
	products: object;
	amount: number;
	address: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		products: [
			{
				productId: {
					type: String,
				},
				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
	},
	{
		timestamps: true,
	} //enable us to get time for user created or updated
);

const Cart = mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;
