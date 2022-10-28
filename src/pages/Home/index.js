import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios'
import People from '../../assets/people.svg';
import Arrow from '../../assets/arrow.svg'

import { Conteiner, H1, Image, ConteinerItens, InputLabel, Input, Button } from "./styles"

function App() {
  // const users = [];
  const [users, setUsers] = useState([])
  const history = useHistory()
  // const [name, setName] = useState([]) USADO COM useState
  // const [age, setAge] = useState([]) USADO COM useState
  const inputName = useRef()
  const inputAge = useRef()

  async function addNewUser() {
    const { data: newUser } = await axios.post("http://localhost:3001/users", { name: inputName.current.value, age: inputAge.current.value })

    setUsers([...users, newUser]);

    history.push("/usuarios")
  }

  // function changeInputName(event) { USADO COM useState
  //   setName(event.target.value)
  // }

  // function changeInputAge(event) { USADO COM useState
  //   setAge(event.target.value)
  // }

  return (
    <Conteiner>
      <Image alt="logo-imagem" src={People} />
      <ConteinerItens>
        <H1>{`Olá !`}</H1>

        <InputLabel>Nome</InputLabel>
        <Input /*onChange={changeInputName} USADO COM useState*/ ref={inputName} placeholder='Nome'></Input>

        <InputLabel>Idade</InputLabel>
        <Input /*onChange={changeInputAge} USADO COM useState*/ ref={inputAge} placeholder='Idade'></Input>

        <Button onClick={addNewUser}>Cadastrar <img alt="seta" src={Arrow} /></Button>

      </ConteinerItens>
    </Conteiner>
  )
}

export default App