import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface OrderDocument extends mongoose.Document {
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

const orderSchema = new mongoose.Schema(
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

		amount: {
			type: Number,
			required: true,
		},
		address: {
			type: Object,
			required: true,
		},
		status: {
			type: String,
			default: 'pending',
		},
	},
	{
		timestamps: true,
	} //enable us to get time for user created or updated
);

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;
