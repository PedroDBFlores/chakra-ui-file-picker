import path from "path"
import type {Config} from "@jest/types"
import { defaults as tsjPreset } from 'ts-jest/presets'

const jestConfig: Config.InitialOptions = {
    transform: {
        ...tsjPreset.transform
    },
    roots: [
        "<rootDir>/src",
        "<rootDir>/tests"
    ],
    testMatch: ["**/*.test.ts", "**/*.test.tsx"],
    testEnvironment: "jsdom",
    clearMocks: true,
    coveragePathIgnorePatterns: [path.join(__dirname, "tests")],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleDirectories: ["node_modules", path.join(__dirname, "src"), path.join(__dirname, "tests")],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js"
    ]
}

export default jestConfig
