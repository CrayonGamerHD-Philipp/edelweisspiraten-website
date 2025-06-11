module.exports = {
    apps: [
        {
            name: 'sveltekit',
            script: 'npm',
            args: 'start',
            env: {
                PORT: 3000,
                HOST: '0.0.0.0'
            }
        }
    ]
};
