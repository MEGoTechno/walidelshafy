const expressAsyncHandler = require("express-async-handler");
const NotificationModel = require("../models/NotificationModel");
const { getAll, insertOne, updateOne, deleteOne } = require("./factoryHandler");
const { notificationMethods } = require("../tools/constants/sendersConstants");
const UserModel = require("../models/UserModel");
const CommercialUserModel = require("../models/CommercialUserModel");

const createError = require("../tools/createError");
const { FAILED, SUCCESS } = require("../tools/statusTexts");
const selectUsers = require("../tools/fcs/selectUsers");
const senderByMethod = require("../tools/fcs/senderByMethod");

// Use dynamic import() to load p-limit
const pLimit = async () => {
    const module = await import('p-limit');
    return module.default;
};

const notificationParams = (query) => {
    return [
        { key: "user", value: query.user, operator: 'equal' },
        { key: "message", value: query.message },
        { key: "subject", value: query.subject },
        { key: "isSeen", value: query.isSeen, type: 'boolean' },
    ]
} //modify it to be more frontend

const getNotifications = getAll(NotificationModel, 'notifications', notificationParams, true)
const createNotification = insertOne(NotificationModel)

const updateNotification = updateOne(NotificationModel)
const deleteNotification = deleteOne(NotificationModel)

//routes /notifications/seen/:userId
const makeSeen = expressAsyncHandler(async (req, res, next) => {
    const user = req.params.userId
    await NotificationModel.updateMany({ user }, { isSeen: true })
    res.status(204)
})

//before create Notification
const handelNotification = expressAsyncHandler(async (req, res, next) => {
    const method = req.body.method
    const userId = req.body.user
    const message = req.body.message
    const subject = req.body.subject
    const isCommercial = req.body.isCommercial

    const user = isCommercial ? await CommercialUserModel.findById(userId).lean() : await UserModel.findById(userId).lean()
    if (!user) return next(createError("المستخدم غير موجود", 404, FAILED))

    await senderByMethod({ method, user, subject, message, isCommercial })
    req.successMsg = 'تم ارسال : ' + notificationMethods.find(n => n.value === method).label

    next()
})

const sendNotificationsToMany = expressAsyncHandler(async (req, res, next) => {
    const limit = (await pLimit())(5); // Limit to 5 concurrent operations
    //grb routes
    const method = req.body.method
    const message = req.body.message
    const subject = req.body.subject
    const isCommercial = req.body.isCommercial

    //Who receive
    const match = selectUsers(req.body)
    const users = isCommercial ? await CommercialUserModel.find(match).lean() : await UserModel.find(match).lean();

    let failedNums = 0
    // Process each user in parallel
    await Promise.all(users.map(user => limit(async () => {
        try {
            await senderByMethod({ method, user, message, subject, isCommercial })
        } catch (error) {
            failedNums += 1
            console.log('failed to send in sendNotificationByWhats ==>', error)
        }
    })));

    const messageToSend = 'تم ارسال : ' + (notificationMethods.find(n => n.value === method).label) + ' ' + 'العدد = ' + (users.length - failedNums)
    return res.status(200).json({ status: SUCCESS, values: '', message: messageToSend })
})
module.exports = { getNotifications, handelNotification, createNotification, sendNotificationsToMany, updateNotification, deleteNotification, notificationParams, makeSeen }