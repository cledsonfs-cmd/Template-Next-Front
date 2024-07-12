module.exports = {
    // content: ["./src/**/*.{js,ts,jsx,tsx}"],
    // theme: {
    //   extend: {},
    // },
    // plugins: [],
    purge: [
        './src/pages/**/*.{{js,ts,jsx,tsx}}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};