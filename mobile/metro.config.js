// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
	// [Web-only]: Enables CSS support in Metro.
	isCSSEnabled: true,
});

config.watchFolders = [
	// Allow Metro to watch workspace root and shared packages
	require("path").join(__dirname, "../shared"),
];

/*
config.resolver.nodeModulesPaths = [
  require('path').join(__dirname, 'node_modules'),
  require('path').join(__dirname, '../../node_modules'),
];
*/

module.exports = config;
