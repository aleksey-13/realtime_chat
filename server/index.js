const ws = require('ws')

const PORT = process.env.PORT || 5000

const wss = new ws.Server({ port: PORT }, () =>
    console.log(`Server started on port ${PORT}`)
)

const messages = []

function pushToArrayLastTenMsgs(msg) {
    if (messages.length > 10) {
        messages.shift()
    }

    messages.push(msg)
}

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)

        switch (message.event) {
            case 'message':
                pushToArrayLastTenMsgs(message)
                broadcastMessage(message)
                break
            case 'connection':
                ws.send(JSON.stringify(messages))
                break
        }
    })
})

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message))
    })
}
