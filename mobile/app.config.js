module.exports = {
    name: 'Amazondle',
    version: '1.0.0',
    scheme: "Amazondle",
    android: {
        package: 'com.amazondle.amazondle',
    },
    extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        "eas": {
            "projectId": "c1d68488-4df4-47cb-932c-a0de949952d4"
        }
    },
};