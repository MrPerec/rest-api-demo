const express = require('express'); //подключили express
const path = require('path'); //создали объект из модуля path для работы с путями
const app = express(); //создали объект app

//при запуске сервера еще нужно запускать и клиента
app.use(express.static(path.resolve(__dirname, 'client'))); //что бы отдавать данные из клиента нужно обозначить её как статическую.

//когда выполняю любые запросы get('*')
//тогда выполняется анонимная функция которая приниает request и response
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html')); //и возвращаю файл из текущей директории, папки client, файл index.html
});

app.listen(3000, () => console.log('Server has been started on port 3000...')); //запуск сервера и вывод сообщения
