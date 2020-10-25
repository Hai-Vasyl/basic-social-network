import { ApolloServer } from "apollo-server"
import mongoose from "mongoose"
import { config } from "dotenv"
// import isAuth from "./context/isAuth"
import schema from "./schema"

config()
const { PORT, MONGO_USER, MONGO_PASS, MONGO_DB, NODE_ENV } = process.env
const isDev = NODE_ENV === "development"
  // app.use(express.static("dist/client"))

  // const typeDefs = gql`
  //   type Query {
  //     sayHello: String
  //   }
  // `

  // const resolvers = {
  //   Query: {
  //     sayHello: () => {
  //       return "Hello everyone!"
  //     }
  //   }
  // }

  ; (async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.osxef.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
        {
          useCreateIndex: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
        () => console.log("MongoDB started successfully!")
      )

      const server = new ApolloServer({
        ...schema,
        playground: isDev,
        // context: ({ req }) => {
        //   return { isAuth: isAuth(req) }
        // },
      })

      server.listen({ port: PORT }).then(({ url }) => {
        console.log(`Server started on url: ${url}`)
      })

    } catch (error) {
      console.error(`Server error: ${error.message}`)
    }
  })()