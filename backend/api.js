const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port:  2525,
  secure: false,
  auth: {
    user: process.env.EMAIL_SEND,
    pass: process.env.PASSWORD_SEND,
  },
});

const responseTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, 
  },
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
      from: process.env.EMAIL_SEND,
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
    

    // Envia os dois e-mails

   await Promise.all([
  transporter.sendMail(mailOptions),
  responseTransporter.sendMail({
    from: process.env.EMAIL_SEND,
    to: email, // aqui vai para quem fez o pedido!
    subject: "Recebemos seu pedido",
    html:
      `<p>Olá! Muito obrigado, iremos realizar o orçamento solicitado do seu ${service} e retornaremos em breve.</p>` +
      `<p>Atenciosamente,<br>Rafael Collares</p>`
  })
]);

  
 

    

    res.status(200).send('success');
  } catch (error) {
    console.error("ERRO COMPLETO:", error);
  res.status(500).json({ error: error.message });

  }
}

module.exports = { sendMail };
