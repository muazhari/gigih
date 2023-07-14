import express from 'express'
import CustomerController from '../controllers/CustomerController'
import TransactionController from '../controllers/TransactionController'

const router = express.Router()

router.use('/customers', new CustomerController().router)
router.use('/transactions', new TransactionController().router)

export default router
