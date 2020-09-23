module.exports = {
    // roots: ["<rootDir>"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "@src/(.*)$": "<rootDir>/src/$1",
    },
    // testMatch: [
    //     "**/__tests__/**/*.+(ts|tsx|js)",
    //     "**/.+.(spec|test).(ts|tsx|js)",
    // ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js"],
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
        },
    },
};
