# EC2-Node-full-stack-app
A node.js full-stack application using socket.io to display sent messages in real time. Hosted in AWS EC2

## Main features
- Backend built using Node.js and Express.js
- Simple frontend UI using Tailwindcss (https://tailwindcss.com/)
- Message persistence even on Instance reboot/shutdow
- Instance running on AWS EC2
- Administrator's panel for instance performance using Netdata (https://github.com/netdata/netdata)
- Ports reverse proxy routing and panel authorization using Nginx (https://github.com/nginx/nginx)
- Real-time message update through Socket.io
