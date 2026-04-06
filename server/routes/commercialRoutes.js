const { getUsers, createUser, deleteManyUsers, addToUsers, getByUserName, updateUser, updateUserProfile, deleteUser, checkDeleteUser } = require("../controllers/commercialController")
const allowedTo = require("../middleware/allowedTo")
const { imageUpload } = require("../middleware/storage")
const verifyToken = require("../middleware/verifyToken")
const { user_roles } = require("../tools/constants/rolesConstants")
const router = require("express").Router()

router.route("/")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), getUsers)
    .post(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), createUser)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), deleteManyUsers)

router.route('/push')
    .patch(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), addToUsers)

router.route("/:userName")
    .get(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN, user_roles.MENTOR), getByUserName)

router.route("/:id")
    .put(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), updateUser)
    .patch(verifyToken(), imageUpload.single("avatar"), updateUserProfile)
    .delete(verifyToken(), allowedTo(user_roles.ADMIN, user_roles.SUBADMIN), deleteUser)

module.exports = router