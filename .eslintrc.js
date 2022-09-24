module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended"
    ],
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "react/no-unescaped-entities": "off",
        "react/prop-types": [2, { ignore: ["children"] }],
        "prefer-const": "error",
        "semi": [2, "never"],
        "quotes": ["error", "double", { "allowTemplateLiterals": true }],
        "@typescript-eslint/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "none",    // 'none' or 'semi' or 'comma'
                requireLast: true,
            },
            singleline: {
                delimiter: "semi",    // 'semi' or 'comma'
                requireLast: false,
            },
        }],
        "@typescript-eslint/ban-ts-comment": 0,
    },
    "overrides": [
        {
            "files": ["*.test.tsx", "*.test.ts", "tests/**"],
            "rules": {
                "testing-library/prefer-find-by": "error",
                "testing-library/no-debugging-utils": "error",
                "react/display-name": "off",
                "no-restricted-globals": ["error", "console"],
                "react/prop-types": "off",
            }
        }
    ]
};
