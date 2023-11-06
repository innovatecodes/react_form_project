import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
// import ENV from "../ENV";

const ContactForm = styled.form`
max-width: 360px;
margin: auto;
`;

const Fieldset = styled.fieldset`
  border: none;
  outline: none;
  border: 3px solid #999;
  border-radius: 4px;
  padding: 0 7.5px;
`;

const Legend = styled.legend`
margin-bottom: 7.5px;
color: #999;
font-family: "Lato", sans-serif;
text-transform: capitalize;
`;

const Label = styled.label`
font-family: "Lato", sans-serif;
font-weight: 400;
display: block;
color: #999;
`;

const Input = styled.input`
outline: none;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  color: #999;
  background-color: inherit;
  border: 2px solid #999;
  border-radius: 4px;
  font-size: initial;
  letter-spacing: 1px;
  width: calc(100% - 17px);
  padding: 7.5px;
  margin: 7.5px 0;
  resize: vertical;
  transition: border 0.2s ease-in;
`;

const Textarea = styled.textarea`
outline: none;
  font-family: "Lato", sans-serif;
  font-weight: 400;
  color: #999;
  background-color: inherit;
  border: 2px solid #999;
  border-radius: 4px;
  font-size: initial;
  letter-spacing: 1px;
  width: calc(100% - 17px);
  padding: 7.5px;
  margin: 7.5px 0;
  resize: vertical;
  transition: border 0.2s ease-in;
`;

const Button = styled.button`
  position: relative;
  width: 120px;
  height: 48px;
  margin-bottom: 7.5px;
  border-radius: 4px;
  font-family: "Lato", sans-serif;
  font-size: unset;
  letter-spacing: 1px;
  line-height: calc(48px - 4px);
  color: #999;
  font-weight: bold;
  border: 3px solid #999;
  background-color: #fafafa;
  transition: 0.2s ease-in;
  cursor: pointer;
`;
const Form = ({ legend }) => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    // const { REACT_APP_API_KEY, REACT_APP_EMAIL, REACT_APP_NAME, REACT_APP_API_URL } = ENV;
   
    const html = `
    <p><b>Nome:</b> <i>${formData.name}</i></p>\n
    <p><b>E-mail:</b> <i>${formData.email}</i></p>\n
    <p><b>Mensagem:</b> <i>${formData.message}</i></p>\n
    `
    const body = {
        sender: {
            name: formData.name,
            email: formData.email
        },
        to: [
            {
                name: process.env.REACT_APP_NAME,
                email: process.env.REACT_APP_EMAIL
            }
        ],
        subject:
            `E-mail de: ${formData.email}`,
        htmlContent: `${html}`,
    }

    const handleChange = ({ target }) => {
        const { id, value } = target;
        setFormData({ ...formData, [id]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(process.env.REACT_APP_API_URL, body, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'text/plain',
                'api-key': process.env.REACT_APP_API_KEY,
            },
        })
            .then(data => data)
            .catch(error => console.error(`Erro ao enviar e-mail! => ${error}`));
    }

    return (
        <ContactForm className='contact-form' onSubmit={handleSubmit}>
            <Fieldset>
                <Legend>
                    <h3>{legend}</h3>
                </Legend>
                <Label htmlFor="name">Nome</Label>
                <Input
                    type="text"
                    id="name"
                    placeholder="Insira seu nome"
                    name={formData.name}
                    // onChange={event => setName.targe.value}
                    // onChange={event => setFormData.name.target.value}
                    onChange={handleChange}
                />
                <Label htmlFor="email">E-mail</Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="Insira seu e-mail"
                    name={formData.email}
                    // onChange={event => setEmail.targe.value}
                    // onChange={event => setFormData.email.target.value} 
                    onChange={handleChange}
                />
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                    id="message"
                    rows="8"
                    cols="50"
                    maxLength="600"
                    placeholder="Insira sua mensagem"
                    name={formData.message}
                    // onChange={event => setMessage.targe.value}
                    // onChange={event => setFormData.message.target.value}
                    onChange={handleChange}
                ></Textarea>
                <Button id="send-message" type="submit">Enviar</Button>
            </Fieldset>
        </ContactForm>
    )
}

export default Form