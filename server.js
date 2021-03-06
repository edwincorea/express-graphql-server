const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')
const requireGraphQLFile = require('require-graphql-file')

const source = requireGraphQLFile('./schema')

const schema = buildSchema(source)

const coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

const getCourse = (args) => {
    const id = args.id
    return coursesData.filter(course => {
        return course.id === id
    })[0]    
}

const getCourses = (args) => {
    if (args.topic) {
        const topic = args.topic
        return coursesData.filter(course => course.topic === topic)
    } else {
        return coursesData
    }
}

const updateCourseTopic = ({id, topic}) => {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic            
        }

        return course
    })

    return coursesData.filter(course => course.id === id)[0]
}

// Root resolver
const rootValue = {
    // message: () => 'Hello World!'
    course: getCourse,
    courses: getCourses,
    updateCourseTopic   
}

// Create an express server and a GraphQL endpoint
const app = express()
app.use('/graphql', expressGraphql({
    schema,
    rootValue,
    graphiql: true
}))

app.listen(4000, () => console.log('Express GraphQL Server Now Running on localhost:4000/graphql'))