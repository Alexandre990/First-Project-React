const express = require('express');
const uuid = require('uuid');
const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors())

/*
        Query Params => meusite.com/users?nome=alexandre&age=31  // usado para FILTROS
        Route Params => /users/2  // BUSCAR, DELETAR OU ATUALIZAR algo específico
        Request Body => { "name":"alexandre", "age":}

        - GET       => Busca informações no back-end 
        - POST      => Cria informações no back-end
        - PUT/PATCH => Alterar/Atualizar informações no back-end 
        - DELETE    => Delete informações no back-end
*/

const users = []

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', (request, response) => {
    const { id } = request.params
    const { name, age } = request.body

    const updateUser = { id, name, age }

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found" })
    }

    users.splice(index, 1)

    return response.status(204).json()
})



app.listen(port, () => {
    console.log(`🚀Server started on port ${port}`)
})