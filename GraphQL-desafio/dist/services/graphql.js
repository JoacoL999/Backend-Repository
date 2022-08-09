"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphQLMainSchema = void 0;
const { SchemaComposer } = require('graphql-compose');
const { GamesQueries, GamesMutations } = require('../controllers/gamesController');
const schemaComposer = new SchemaComposer();
schemaComposer.Query.addFields(Object.assign({}, GamesQueries));
schemaComposer.Mutation.addFields(Object.assign({}, GamesMutations));
exports.graphQLMainSchema = schemaComposer.buildSchema();
