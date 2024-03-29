module.exports = {
    name: 'MyApp',
    version: '1.0.0',
    scheme: "myapp",
    extra: {
        clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
};