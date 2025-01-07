const path = require('path');
const tsNode = require('ts-node');

tsNode.register({
	transpileOnly: true,
	compilerOptions: {
		module: 'commonjs',
	},
});

const dataSourcePath = path.resolve(__dirname, 'src/typeorm/data-source.ts');

try {
	const { AppDataSource } = require(dataSourcePath);
	module.exports = AppDataSource;
} catch (error) {
	console.error('Error loading AppDataSource:', error);
	throw error;
}