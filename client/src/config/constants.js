const constants = {
  dev: {
    HOST_URL: 'http://localhost:5000/api/',
    SOCKET_URL: 'http://localhost:5000',
  },
  prod: {
    HOST_URL: process.env.REACT_APP_HOST_URL || '/api/',
    SOCKET_URL: '',
  }
};

const REACT_APP_ENV = process.env.REACT_APP_ENV || "dev";

export default constants[REACT_APP_ENV];
