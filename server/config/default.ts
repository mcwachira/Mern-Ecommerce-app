(async function () {
	await import('dotenv/config');
})();
require('dotenv').config();

export const client = {
	port: process.env.PORT,
	dbUri: process.env.MONGO_URI,
	jwtSecret: process.env.JWT_SECRET,
	saltWorkFactor: 10,
	accessTokenTtl: '15m',
	refreshTokenTtl: '1y',
	accessTokenPrivateKey: ``,
	accessTokenPublicKey: ``,
	refreshTokenPrivateKey: ``,
	refreshTokenPublicKey: ``,
};
