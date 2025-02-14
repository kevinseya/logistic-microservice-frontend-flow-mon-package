// PaymentModal.js
import React from 'react';
import Modal from 'react-modal';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import './PaymentModal.css';


Modal.setAppElement('#root'); 
// Asegúrate de que "#root" sea el id del div principal en index.html

const PaymentModal = ({ isOpen, onClose, stripePromise, clientSecret }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose} 
      className="payment-modal"
      overlayClassName="payment-overlay"
    >
      <h3>Datos de Pago</h3>

      {/* Si ya tenemos el clientSecret, renderizamos PaymentForm */}
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Cargando información de pago...</p>
      )}

      <button onClick={onClose} className="close-btn">
        Cerrar
      </button>
    </Modal>
  );
};

export default PaymentModal;
