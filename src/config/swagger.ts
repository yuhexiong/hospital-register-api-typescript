const swaggerOption = {
  info: {
    title: 'Hospital Register Document',
    version: '1.0.0',
    description: 'Hospital Register',
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  baseDir: `${__dirname}/../..`,

  filesPattern: ['./src/**/*.ts', './src/**/*.js'],

  swaggerUIPath: `${process.env.SWAGGER_MOUNT_PATH}`,
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Local Server"
    },
  ]
};

export default swaggerOption;
