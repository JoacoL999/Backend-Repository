import { Twilio } from "twilio"
import config from "../config"
import nodemailer from 'nodemailer'
import { errorLogger, infoLogger, warnLogger, debugLogger } from '../utils/loggers'

const accountSid = config.TWILIO_ACCOUNT_ID;
const authToken = config.TWILIO_TOKEN;
const client = new Twilio(accountSid, authToken);

class Services {
  private owner
  private transporter

    async wsp (user: any) {
      try{
        const games = user.carts.map((e) => {return JSON.stringify(`- *${e.name}* -> $${e.price} -`, null, 2).replace(/\"/g, "")})
        client.messages
            .create({
               from: 'whatsapp:+14155238886',
               body: `Hola ${user.user}! Su pedido de compra ==> ${games}`,
               to: `whatsapp:${user.phoneNum}`
             })
            .then(message => infoLogger.info(message.sid));
        } catch (error: any) {
          errorLogger.error(error.message)
          throw new Error(`Error sending whatsapp: ${error.message}`)
        }  
}

constructor() {
  this.owner = {
      name: config.GMAIL_NAME,
      address: config.GMAIL_EMAIL
  }

  this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: config.GMAIL_EMAIL,
          pass: config.GMAIL_PASSWORD
      },
  })

  this.transporter.verify().then(() => infoLogger.info('Email ready'))
}


async sendEmail (user: any) {
  const games = user.carts.map((e) => {return JSON.stringify(`- ${e.name} -> $${e.price} -`, null, 2).replace(/\"/g, "")})
  const mailOptions = {
      from: this.owner,
      to: user.user,
      subject: `Pedido de compra ${user.user}`,
      html: `Hola! este es su pedido de compra
      ${games}`
  }
  try{
      const response = await  this.transporter.sendMail(mailOptions)
      return response
  } catch (error: any) {
      return errorLogger.error({ error: error.message })
  }
 
}   
}

const msgController = new Services()
export default msgController