import mongoose from 'mongoose';

export interface ProductDocument extends mongoose.Document {
	productId: string;
	name: string;
	description: string;
	price: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true,
		},
		desc: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			require: true,
		},
		categories: {
			type: Array,
		},

		price: {
			type: String,
			required: true,
		},
		inStock: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	} //enable us to get time for user created or updated
);

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
