import React from 'react';
import Input from '../common/Input';
import { CreditCard, Calendar, Lock } from 'lucide-react';

export default function PaymentForm({ paymentData, onChange, errors = {} }) {
  return (
    <div className="space-y-4">
      {/* Demo helper pill */}
      <div className="flex items-center justify-between p-3 bg-slate-50 border border-border rounded-xl text-xs text-slate-600">
        <span className="flex items-center gap-1.5 font-medium">
          <CreditCard className="w-4 h-4 text-primary" />
          Test Card Simulation
        </span>
        <span className="text-[11px] text-slate-400">
          Enter any 16-digit number
        </span>
      </div>

      <Input
        label="Card Number"
        name="cardNumber"
        placeholder="4242 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242"
        maxLength={19}
        value={paymentData.cardNumber}
        onChange={onChange}
        error={errors.cardNumber}
        icon={CreditCard}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          name="cardExpiry"
          placeholder="MM/YY"
          maxLength={5}
          value={paymentData.cardExpiry}
          onChange={onChange}
          error={errors.cardExpiry}
          icon={Calendar}
          required
        />
        <Input
          label="Security CVC / CVV"
          name="cardCvc"
          placeholder="123"
          maxLength={4}
          type="password"
          value={paymentData.cardCvc}
          onChange={onChange}
          error={errors.cardCvc}
          icon={Lock}
          required
        />
      </div>
    </div>
  );
}
