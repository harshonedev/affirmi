import express from 'express'
import { errorAffirmations, loveAffirmations } from './constants.js'
import crush from './crush.js'
import morgan from 'morgan'
import env from 'dotenv'

const app = express()
env.config()
const port = process.env.PORT || 5000

// Use Morgan for logger
app.use(morgan('default'))

// Middleware to add romantic headers
app.use((req, res, next) => {
    res.setHeader('X-Love-Status', 'Deeply-In-Love')
    res.setHeader('X-Crush-Factor', 'Maximum')
    next()
})

// Main affirmation route
app.get('/', (req, res) => {
    const randomAffirmation = loveAffirmations[Math.floor(Math.random() * loveAffirmations.length)]

    res.json({
        success: true,
        message: "A special affirmation just for you ✨",
        affirmation: randomAffirmation,
        from: "Someone who cares about you deeply",
        timestamp: new Date().toISOString(),
        heartbeats: "∞"
    })
})



app.use(crush)

// 404 Error Handler
app.use((req, res) => {
    const errorAffirmation = errorAffirmations[404][Math.floor(Math.random() * errorAffirmations[404].length)]

    res.status(404).json({
        success: false,
        error: "Route not found",
        statusCode: 404,
        affirmation: errorAffirmation,
        message: "Even in errors, you're still on my mind 💕",
        suggestion: "Try visiting / or /your_name for some love",
        timestamp: new Date().toISOString()
    })
})

// General Error Handler
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    const affirmationArray = errorAffirmations[statusCode] || errorAffirmations[500]
    const errorAffirmation = affirmationArray[Math.floor(Math.random() * affirmationArray.length)]

    res.status(statusCode).json({
        success: false,
        error: error.message || "Internal server error",
        statusCode: statusCode,
        affirmation: errorAffirmation,
        message: "Even when things go wrong, you make everything feel right 💖",
        healing: "Your smile can fix any bug in my code",
        timestamp: new Date().toISOString()
    })
})

app.listen(port, () => {
    console.log(`App server is running on port ${port}`)
})