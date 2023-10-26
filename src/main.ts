import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import resolvers from "./resolvers/book.resolvers";
import { typeDefs } from "./types/schema.graphql";
import bodyParser from "body-parser";
import { loggingMiddleware } from "./middleware/logging.middleware";
import dotenv from "dotenv";

async function startApolloServer() {
  try {
    // Create an Express application
    const app = express();
    const httpServer = http.createServer(app);
    dotenv.config();

    // Create a new ApolloServer instance with the resolvers
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    // logging middleware
    app.use(loggingMiddleware);

    // Apply the ApolloServer middleware to the Express application
    app.use(
      cors({
        origin: "*", // <- allow request from all domains for now
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      }),
      bodyParser.json(),
      expressMiddleware(server)
    );

    // add health check
    app.get("/health", (req, res) => {
      res.send("OK");
    });

    // Start the Express application on the specified port
    const port = process.env.PORT || 9007;
    app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  } catch (err) {
    console.log(err);
  }
}

startApolloServer();
