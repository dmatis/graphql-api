const { ApolloServer, gql, ApolloError } = require('apollo-server');
const { ApolloServerPluginInlineTrace } = require("apollo-server-core");
const SessionAPI = require('./datasources/sessions');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const dataSources = () => ({
  sessionAPI: new SessionAPI(),
  speakerAPI: new SpeakerAPI(),
});

const server = new ApolloServer({
  apollo: {
    key: 'service:gh.e1ab5203-3fba-43aa-ba5f-426315872f3c:CHc9Kfvcb8EWKjiO5nEVYg'
  },
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginInlineTrace()],
  dataSources,
  debug: false,
  formatError: (err) => {
    if(err.extensions.code == 'INTERNAL_SERVER_ERROR') {
      return new ApolloError("We are having some trouble", "ERROR", {token: "uniquetoken-correlationID"})
    }
    return err;
  }
});

server
  .listen({port: process.env.PORT || 4000})
  .then(({url}) => {
  console.log(`graphQL running ${url}`);
})