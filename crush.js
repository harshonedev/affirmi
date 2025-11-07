import express from 'express'
import { loveAffirmations } from './constants.js'
const app = express()

app.get('/crush-name', (req, res) => {
    const randomAffirmation = loveAffirmations[Math.floor(Math.random() * loveAffirmations.length)]

    res.json({
        success: true,
        type: "love_affirmation",
        affirmation: randomAffirmation,
        dedication: "For the most amazing person in this world",
        sentiment: "Specially crafted for crush-name 💜",
        to: "crush-name",
        timestamp: new Date().toISOString()
    })
})

export default app