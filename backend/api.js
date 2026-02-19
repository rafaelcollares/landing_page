const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
});

// Email que chega para você
async function sendMail(req, res) {
  try {

    
    const { name, email, phone, service, message } = req.body;
    function validEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
    
    if(!validEmail (email)){
      console.log('Email inválido');

      return res.status(400).send('error')
    }
    if(!email || !name){
      console.log('Campos obrigátorios faltando');
      return res.status(400).send('Campos obrigátorios faltando')
    }
    
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Pedido de orçamento de ${email}`,
      html:
        `<p>Nome: ${name}</p>` +
        `<p>E-mail: ${email}</p>` +
        `<p>Telefone: ${phone}</p>` +
        `<p>Serviço: ${service}</p>` +
        `<p>Mensagem: ${message}</p>`,
    };

    // Resposta automática para o cliente
    const responseMailOptions = {
      from: process.env.EMAIL,
      to: email, // aqui vai para quem fez o pedido!
      subject: "Recebemos seu pedido",
      html:
        `<p>Olá! Muito obrigado, iremos realizar o orçamento solicitado do seu ${service} e retornaremos em breve.</p>` +
        `<p>Atencionamente,<br>Rafael Collares</p>`
    };

    // Envia os dois e-mails

    await Promise.all([
    transporter.sendMail(mailOptions),
    transporter.sendMail(responseMailOptions),]);

    console.log('Emails enviados com sucesso');

  
 

    

    res.status(200).send('success');
  } catch (error) {
    console.error(error);
    res.status(500).send('error')

  }
}

module.exports = { sendMail };
