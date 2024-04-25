module.exports = {
    name: 'Amazondle',
    version: '1.0.0',
    android: {
        package: 'com.amazondle.amazondle',
        adaptiveIcon: {
            foregroundImage: "./assets/icon.png",
            backgroundColor: "#1F104A",
        },
    },
    "splash": {
        "image": "./assets/icon.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    "ios": {
        "bundleIdentifier": "com.amazondle.amazondle"
    },
    extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        "eas": {
            "projectId": "c1d68488-4df4-47cb-932c-a0de949952d4"
        }
    },
};