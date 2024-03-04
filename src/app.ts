import { createBot, MemoryDB, createFlow, createProvider, addKeyword} from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenida = addKeyword('hola').addAnswer('Buenas !! bienvenido')

const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const body = req.body
        const phone = req.body.phone
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage(phone, message, {
            media: mediaUrl
        })
        res.end('Esto es de polca')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()