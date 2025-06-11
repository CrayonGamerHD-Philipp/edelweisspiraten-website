module.exports = {
    apps: [
        {
            name: 'sveltekit',
            script: 'npm',
            args: 'start',
            env: {
                PORT: 3001,
                HOST: '0.0.0.0'
            }
        }
    ]
};
