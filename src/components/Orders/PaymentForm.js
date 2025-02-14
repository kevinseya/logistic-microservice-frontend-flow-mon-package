import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import './PaymentForm.css';

const PaymentForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

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

    // Confirmar el pago con Stripe
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

export default PaymentForm;
