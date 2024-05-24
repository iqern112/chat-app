const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // ใช้ UUID สำหรับไอดีที่ไม่ซ้ำกัน

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    const userId = uuidv4(); // สร้าง UUID สำหรับผู้ใช้
    console.log('A user connected with custom id:', userId);
    
    // เก็บไอดีใน socket instance
    socket.userId = userId;
    
    // ส่ง id กลับไปยังไคลเอนต์
    socket.emit('user-id', userId);

    // รับข้อความจากไคลเอนต์
    socket.on('chat-message', (msg) => {
        io.emit('chat-message', { userId, msg });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', userId);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
