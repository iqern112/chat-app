const socket = io();

socket.on('connect', () => {
    console.log('Connected to the server');
});

socket.on('user-id', (userId) => {
    console.log('My user id:', userId);
    // คุณสามารถใช้ userId นี้เพื่อทำสิ่งต่างๆ เช่น เก็บใน localStorage หรือแสดงผลในหน้าเว็บ
});

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatDisplay = document.getElementById('chat-display');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit('chat-message', message);
        messageInput.value = '';
    }
});

socket.on('chat-message', ({ userId, msg }) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `User ${userId}: ${msg}`;
    chatDisplay.appendChild(messageElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // เลื่อนลงไปยังข้อความล่าสุด
});
