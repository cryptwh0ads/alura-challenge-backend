const validator = require('../utils/ValidateRequest')
const db = require('../config/db')
const VideoModel = require('../model/Videos')

const create = async (req, res) => {
    const {title, description, urlDirection} = req.body

    const isValid = validator(req.body)

    if (isValid.length > 0) {
        res.status(400).json({
            status_code: 400,
            error: true,
            messageError: isValid
        })
    } else {
        try {
            await db.sync()

            const newVideo = await VideoModel.create({
                title,
                description,
                urlDirection
            })

            res.status(201).json({
                status_code: 201,
                message: `The video ${title} has been saved`,
                data: req.body
            })
        } catch (err) {
            res.status(500).json({
                status_code: 500,
                error: true,
                messageError: err
            })
        }
    }
}

const index = async (req, res) => {
    try {
        const videos = await VideoModel.findAll()

        res.status(200).json({
            status_code: 200,
            message: "All videos already loaded",
            data: videos
        })
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            error: true,
            messageError: err
        })
    }
}

const getOne = async (req, res) => {
    try {
        const video = await VideoModel.findOne({
            where: {
                id: req.params.videoId
            }
        })

        res.status(200).json({
            status_code: 200,
            message: `The video ${video.title} already loaded`,
            data: video
        })
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            error: true,
            messageError: 'Video not found'
        })
    }
}

const update = async (req, res) => {
    try {

        const video = await VideoModel.findOne({
            where: {
                id: req.params.videoId
            }
        })

        if (video) {
            const videoToUpdate = await VideoModel.update({
                    title: req.body.title,
                    description: req.body.description,
                    urlDirection: req.body.urlDirection
                },
                {
                    where: {
                        id: req.params.videoId
                    }
                })

            res.status(200).json({
                status_code: 200,
                message: `The video already updated`,
                data: videoToUpdate
            })
        } else {
            res.status(500).json({
                status_code: 500,
                error: true,
                messageError: 'Video not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            status_code: 500,
            error: true,
            messageError: 'Video not found'
        })
    }
}

const remove = async (req, res) => {
    try {
        const video = await VideoModel.findOne({
            where: {
                id: req.params.videoId
            }
        })

        if (video) {
            await VideoModel.destroy({
                where: {
                    id: req.params.videoId
                }
            })

            res.status(200).json({
                status_code: 200,
                message: `The video already deleted`,
            })
        } else {
            res.status(500).json({
                status_code: 500,
                error: true,
                messageError: 'Video not found'
            })
        }


    } catch (err) {
        res.status(500).json({
            status_code: 500,
            error: true,
            messageError: 'Video not found'
        })
    }
}

module.exports = {
    index,
    create,
    getOne,
    update,
    remove
}