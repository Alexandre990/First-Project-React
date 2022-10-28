import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import Avatar from '../../assets/avatar.svg';
import Arrow from '../../assets/arrow.svg'
import Trash from '../../assets/trash.svg'

import { Conteiner, H1, Image, ConteinerItens, Button, User } from "./styles"

function Users() {
  // const users = [];
  const [users, setUsers] = useState([]);
  const history = useHistory()
  // const [name, setName] = useState([]) USADO COM useState
  // const [age, setAge] = useState([]) USADO COM useState

  useEffect(() => {
    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users")

      setUsers(newUsers)
    }
    fetchUsers()
  }, [])

  // function changeInputName(event) { USADO COM useState
  //   setName(event.target.value)
  // }

  // function changeInputAge(event) { USADO COM useState
  //   setAge(event.target.value)
  // }

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)

    const newUsers = users.filter(user => user.id !== userId)

    setUsers(newUsers)
  }

  function goBackPage() {
    history.push("/")
  }

  return (
    <Conteiner>
      <Image alt="logo-imagem" src={Avatar} />
      <ConteinerItens>
        <H1>Usuários</H1>

        <ul>
          {users.map((user) => (
            <User key={user.id}>
              <p>{user.name}</p> <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img alt="Lata de lixo" src={Trash}></img>
              </button>
            </User>
          ))
          }
        </ul>

        <Button onClick={goBackPage}><img alt="seta" src={Arrow} />Voltar</Button>

      </ConteinerItens>
    </Conteiner>
  )
}

export default Users