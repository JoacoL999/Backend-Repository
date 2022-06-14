import { Router } from 'express'
import { isLoggedIn } from '../middlewares/auth'
import passport from 'passport'
import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', isLoggedIn, (req, res) => {
    // res.sendFile(path.join(process.cwd(), '/views/home.html'))
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.passport?.user })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})



export default productosWebRouter