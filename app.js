const express = require('express'); //подключили express
const path = require('path'); //создали объект из модуля path для работы с путями
const { v4 } = require('uuid'); //генератор id
const app = express(); //создали объект app

let CONTACTS = [{ id: v4(), name: 'Ilya', value: '+7-999-888-77-66', marked: false }];

app.use(express.json());

//GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS);
  }, 1000);
});

//POST
app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };

  CONTACTS.push(contact);
  res.status(201).json(contact);
});

//DELETE
app.delete('/api/contacts:id', (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id);
  res.status(200).json({ message: 'Контакт был удален' });
});

//PUT
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex((c) => c.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.json(CONTACTS[idx]);
});

//при запуске сервера еще нужно запускать и клиента
app.use(express.static(path.resolve(__dirname, 'client'))); //что бы отдавать данные из клиента нужно обозначить её как статическую.

//когда выполняю любые запросы get('*')
//тогда выполняется анонимная функция которая приниает request и response
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html')); //и возвращаю файл из текущей директории, папки client, файл index.html
});

app.listen(3000, () => console.log('Server has been started on http://localhost:3000/...')); //запуск сервера и вывод сообщения
