import express from 'express'
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe} from  '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter=express.Router()
//admin
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',updateStatus)
//payment
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//user order
orderRouter.post('/userorders',authUser,userOrders)

//verify
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter