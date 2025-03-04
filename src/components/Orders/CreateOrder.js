import React, { useState, useRef } from 'react';
import './CreateOrder.css';  // Tus estilos
import LocationPicker from './LocationPicker'; // Mapa
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

// Stripe
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// Modal
import Modal from 'react-modal';
// Aquí tu publishable key
const stripePromise = loadStripe(${API_PK_TEST_STRIPE});

// Gateway de tu API
const API_GATEWAY = ${IP_API_GATEWAY};

// -------------------------------------------------------
// 1) Componente PaymentForm (Formulario de tarjeta)
// -------------------------------------------------------
const PaymentForm = ({ clientSecret, setShowValidationMessage }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardholderName, setCardholderName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Opciones de estilo para el CardElement
  const CARD_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' }
      },
      invalid: { color: '#9e2146' },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setStatusMsg('Procesando pago...');

    const cardElement = elements.getElement(CardElement);

    // Confirmar el pago en Stripe con la info de la tarjeta
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName
        }
      }
    });

    if (error) {
      setStatusMsg(`Error: ${error.message}`);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setStatusMsg('¡Pago realizado con éxito!');
      const token = sessionStorage.getItem('authToken');

      try {
        const response = await fetch(${API_PAYMENT_VALIDATION}, {
            
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            payment_intent: paymentIntent.id,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error al validar el pago');
        }
  
        const validationData = await response.json();
  
        // Si la validación fue exitosa
        if (validationData.valid) {
          setStatusMsg('Pago validado exitosamente!');
          setShowValidationMessage(true);  // Mostrar el mensaje de validación
  
        } else {
          setStatusMsg('La validación del pago falló.');
        }
      } catch (validationError) {
        setStatusMsg(`Error al realizar la validación: ${validationError.message}`);
      }

    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h4>Datos de Pago</h4>

      <label>Nombre del Titular</label>
      <input
        type="text"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
        placeholder="Ej. Juan Pérez"
        required
      />

      <label>Tarjeta</label>
      <div className="card-element-wrapper">
        <CardElement options={CARD_OPTIONS} />
      </div>

      <button type="submit" disabled={!stripe} className="pay-button">
        Pagar
      </button>

      {statusMsg && <p className="status-message">{statusMsg}</p>}
    </form>
  );
};

// -------------------------------------------------------
// 2) Componente PaymentModal (para mostrar PaymentForm en popup)
// -------------------------------------------------------
Modal.setAppElement('#root'); 

const PaymentModal = ({ isOpen, onClose, clientSecret, setShowValidationMessage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="payment-modal"
      overlayClassName="payment-overlay"
    >
      <h3>Proceso de Pago</h3>
      {/* Renderizamos PaymentForm dentro de <Elements> si tenemos clientSecret */}
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} setShowValidationMessage={setShowValidationMessage} />
        </Elements>
      ) : (
        <p>Cargando...</p>
      )}

      <button onClick={onClose} className="close-button">
        Cerrar
      </button>
    </Modal>
  );
};

// -------------------------------------------------------
// 3) Componente principal: CreateOrder
// -------------------------------------------------------
const CreateOrder = () => {
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [packageDetails, setPackageDetails] = useState('');

  // Coordenadas
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Respuesta de crear orden
  const [orderId, setOrderId] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');

  // Estado de pago
  const [clientSecret, setClientSecret] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showValidationMessage, setShowValidationMessage] = useState(false); // Para mostrar el mensaje de validación

  // Ref para la sección donde se muestra el precio y el botón
  const priceSectionRef = useRef(null);

  const handleShippingSelect = (coords) => {
    setShippingAddress(`${coords.lat},${coords.lng}`);
  };
  const handleDeliverySelect = (coords) => {
    setDeliveryAddress(`${coords.lat},${coords.lng}`);
  };



  // 1) Crear Orden
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No se encontró token');
        return;
      }

      const decoded = jwtDecode(token);
      const idCustomer = decoded.id;

      const orderData = {
        idCustomer,
        senderName,
        receiverName,
        receiverPhone,
        packageDetails,
        shippingAddress,
        deliveryAddress
      };

      const response = await fetch(`${API_GATEWAY}/api/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

      const data = await response.json();
      setOrderId(data.orderId);
      setPrice(data.price);

      // Cuando se crea la orden, hacemos scroll automáticamente hacia la sección del precio
      if (priceSectionRef.current) {
        priceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }

    } catch (err) {
      setError(err.message);
    }
  };

  const handleInitiatePayment = async () => {
    setError('');
    try {
      const token = sessionStorage.getItem('authToken');
      if (!token) {
        setError('No se encontró token');
        return;
      }

      const payload = {
        orderId,
        amount: price,
        currency: 'usd'
      };

      const res = await fetch(${API_PAYMENT_CREATE_INTENT}, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Error al iniciar el pago');
      }

      const data = await res.json(); // { clientSecret, paymentIntent }
      setClientSecret(data.clientSecret);
      setShowModal(true); // Abrimos el popup
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="create-order-container">
      <h2>Crear Orden</h2>

      {/* Form de creación de orden */}
      <form onSubmit={handleCreateOrder} className="create-order-form">
        <div>
          <label>Nombre Remitente:</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nombre Destinatario:</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Teléfono Destinatario:</label>
          <input
            type="text"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Detalles del Paquete:</label>
          <input
            type="text"
            value={packageDetails}
            onChange={(e) => setPackageDetails(e.target.value)}
            required
          />
        </div>

        <h4>Ubicación de Recogida</h4>
        <LocationPicker onLocationSelect={handleShippingSelect} />
        <p className="selected-coord">Coordenadas: {shippingAddress}</p>

        <h4>Ubicación de Entrega</h4>
        <LocationPicker onLocationSelect={handleDeliverySelect} />
        <p className="selected-coord">Coordenadas: {deliveryAddress}</p>

        <button type="submit">Crear Orden</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* Mostrar datos de la orden y botón "Pagar" si ya tengo precio */}
      {price !== null && (
        <div className="order-result" ref={priceSectionRef}>
          <h1>Precio Calculado: ${price}</h1>
          <button onClick={handleInitiatePayment} className="pay-initiate-btn">
            Proceder al Pago
          </button>
          <Link to="/dashboard" className="close-order-btn">
            Cancelar
          </Link>
        </div>
      )}

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        clientSecret={clientSecret}
        setShowValidationMessage={setShowValidationMessage}
      />

      {/* Mostrar mensaje de validación y botón de redirección */}
      {showValidationMessage && (
        <div className="validation-message">
          <p>¡Pago Validado Exitosamente!</p>
          <Link to="/dashboard" className="accept-button">
            Aceptar
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
