require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');


const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/whats', (req, res) => {
  res.json({ link: process.env.WHATSAPP_URL });
});

app.post('/api/email', async (req, res) => {
  try {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    // Email que chega para você
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Pedido de orçamento de ${req.body.email}`,
      html: `<p>Nome: ${req.body.name}</p>`
      + `<p>E-mail: ${req.body.email}</p>`
      + `<p>Telefone: ${req.body.phone}</p>`
      + `<p>Serviço: ${req.body.service}</p>`
      + `<p>Mensagem: ${req.body.message}</p>`
      ,
    };

    // Resposta automática para o cliente
    const responseMailOptions = {
      from: process.env.EMAIL,
      to: req.body.email, // aqui vai para quem fez o pedido!
      subject: "Recebemos seu pedido",
      html: `<p>Olá! Muito obrigado, iremos realizar o orçamento solicitado  do seu ${req.body.service} e retornaremos em breve.</p>`
            +`<p>Atencionamente, <br> Rafael Collares </p>`
    };

    // Envia os dois e-mails
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado para você: ' + info.response);

    const infoResponse = await transporter.sendMail(responseMailOptions);
    console.log('Resposta enviada para cliente: ' + infoResponse.response);

    res.send('success');
   
  } catch (error) {
    console.error(error);
    res.send('error');
  }
});


app.listen(port, () => {
  console.log('Servidor rodando na porta', port);
});
