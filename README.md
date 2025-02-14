# Package Shipment Management Project

This project is an integrated microservices solution for managing package shipments, with a payment gateway, address selection via maps, and different user roles (admin, carrier, client). It is deployed on AWS, utilizing various technologies to ensure its efficiency, scalability, and security.

## Description

The frontend application is developed using **React.js** and runs on port **3003**. The frontend connects to the **AWS API Gateway** to interact with the microservices that handle payments, carrier assignments, and shipment management. The system is based on a microservices architecture, communicating between different microservices through **REST APIs**, **GraphQL**, **WebSockets**, and **Webhooks**.

## Features

- **Frontend with React.js**: The user interface is dynamic and user-friendly, allowing clients to select addresses via maps, make payments, and track the status of their shipments.
- **Connection with API Gateway**: The frontend connects to the AWS API Gateway, which distributes routes and manages interactions between microservices.
- **Security**: Implements authentication using **JWT** (security token), validating access based on user roles (admin, carrier, client).
- **Payment Management**: Integration with **Stripe** for secure payment processing.
- **Carrier Assignment**: Users can manage carrier assignments for package shipments, optimizing logistics.
- **Real-time Notifications**: Through **WebSockets** and **Webhooks**, users receive real-time notifications about the status of their orders and payments.

## Technologies

- **React.js**: A JavaScript library for building interactive user interfaces.
- **API Gateway (AWS)**: For route management and communication between microservices.
- **WebSockets**: For real-time synchronization between the frontend and microservices.
- **Stripe**: Payment gateway used for secure payment processing.
- **CORS**: Manages security for cross-origin resource requests.
- **JWT**: User authentication using security tokens with roles.

## Instructions to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/kevinseya/logistic-frontend-app.git

    ```

2. Install dependences

    ```bash
   npm install
    ```

3. Run server of development
    ```bash
    npm start
    ```


The frontend will be running on port 3003 and will automatically connect to the API Gateway for interactions with the microservices.

![1](https://github.com/user-attachments/assets/03213232-c046-4eac-93ce-a1850b3028d6)
![2](https://github.com/user-attachments/assets/2ddabe38-56b0-43b3-8156-f6e3b8cfd885)
![3](https://github.com/user-attachments/assets/754ebc1a-7217-44f6-8ed6-df3d5fec173f)
![4](https://github.com/user-attachments/assets/74146f7e-4ed8-4ee7-91a7-283e765213bf)
![5](https://github.com/user-attachments/assets/cc9fe6a1-13b6-4d58-aae7-16bdad1e8bdc)
![6](https://github.com/user-attachments/assets/6923572e-4be7-4d00-9f40-1c782d934989)
![7](https://github.com/user-attachments/assets/c48e0e7a-db7d-4466-97bc-dc6db4361e22)
![8](https://github.com/user-attachments/assets/098e307c-903c-4f0b-a455-35d08b62e0e5)

