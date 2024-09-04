import { Router } from 'express'
import { registerUser } from '../controllers/user.controller.js'

const router = Router()

router.route("/register").post(registerUser) // https://localhost:8000/api/v1/users/register
// router.route("/login").post(registerUser) // https://localhost:8000/api/v1/users/login

export default router


// export default hai too kush bhi
// export default hai too { same }