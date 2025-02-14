# Proyecto de Gestión de Envíos de Paquetes

Este proyecto es una solución integral de microservicios para la gestión de envíos de paquetes, con pasarela de pago, elección de direcciones mediante mapas y diferentes roles de usuario (administrador, transportista, cliente). Está desplegado en AWS, utilizando varias tecnologías para garantizar su eficiencia, escalabilidad y seguridad.

## Descripción

La aplicación frontend está desarrollada utilizando **React.js** y corre en el puerto **3003**. El frontend se conecta al **API Gateway** de AWS para interactuar con los microservicios que gestionan los pagos, las asignaciones de transportistas y la gestión de envíos. El sistema está basado en una arquitectura de microservicios, y se comunica entre diferentes microservicios a través de **APIs REST**, **GraphQL**, **WebSockets** y **Webhooks**.

## Características

- **Frontend con React.js**: La interfaz de usuario es dinámica y amigable, permitiendo a los clientes seleccionar direcciones mediante mapas, realizar pagos y seguir el estado de sus envíos.
- **Conexión con API Gateway**: El frontend se conecta al API Gateway de AWS, que distribuye las rutas y gestiona las interacciones entre los microservicios.
- **Seguridad**: Implementa autenticación mediante **JWT** (token de seguridad), validando los accesos según los roles de usuario (administrador, transportista, cliente).
- **Gestión de pagos**: Integración con **Stripe** para el procesamiento de pagos de manera segura.
- **Asignación de transportistas**: Los usuarios pueden gestionar la asignación de transportistas para el envío de paquetes, optimizando la logística.
- **Notificaciones en tiempo real**: A través de **WebSockets** y **Webhooks**, los usuarios reciben notificaciones en tiempo real sobre el estado de sus pedidos y pagos.

## Tecnologías

- **React.js**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **API Gateway (AWS)**: Para la gestión de rutas y comunicación entre microservicios.
- **WebSockets**: Para la sincronización en tiempo real entre el frontend y los microservicios.
- **Stripe**: Pasarela de pago utilizada para procesar pagos de forma segura.
- **CORS**: Gestión de la seguridad en las solicitudes de recursos entre dominios.
- **JWT**: Autenticación de usuarios mediante tokens de seguridad con roles.

## Instrucciones para ejecutar

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
    ```

2. Instala dependencias 

    ```bash
  npm install
    ```

3. Iniciar servidor de desarollo
    ```bash
    npm start
    ```

El frontend estará corriendo en el puerto 3003 y se conectará automáticamente al API Gateway para las interacciones con los microservicios.