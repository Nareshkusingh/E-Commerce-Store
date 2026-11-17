import React from 'react';
import Input from '../common/Input';
import { User, Mail, MapPin, Building, Globe } from 'lucide-react';

export default function AddressForm({ formData, onChange, errors = {} }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="Jane Doe"
          value={formData.fullName}
          onChange={onChange}
          error={errors.fullName}
          icon={User}
          required
        />
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="jane.doe@example.com"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
          icon={Mail}
          required
        />
      </div>

      <Input
        label="Street Address"
        name="address"
        placeholder="123 Market Street, Apt 4B"
        value={formData.address}
        onChange={onChange}
        error={errors.address}
        icon={MapPin}
        required
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          name="city"
          placeholder="San Francisco"
          value={formData.city}
          onChange={onChange}
          error={errors.city}
          icon={Building}
          required
        />
        <Input
          label="State / Province"
          name="state"
          placeholder="CA"
          value={formData.state}
          onChange={onChange}
          error={errors.state}
          required
        />
        <div className="col-span-2 sm:col-span-1">
          <Input
            label="Postal / ZIP Code"
            name="zip"
            placeholder="94103"
            value={formData.zip}
            onChange={onChange}
            error={errors.zip}
            required
          />
        </div>
      </div>
    </div>
  );
}
