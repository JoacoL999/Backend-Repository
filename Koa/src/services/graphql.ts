const { SchemaComposer } = require('graphql-compose');
const { GamesQueries, GamesMutations } = require('../controllers/gamesController');


const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...GamesQueries,
});

schemaComposer.Mutation.addFields({
  ...GamesMutations,
});

export const graphQLMainSchema = schemaComposer.buildSchema();