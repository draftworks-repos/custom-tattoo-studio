import React, { useState } from 'react';
import { Button } from '../../components/Button/Button.jsx';
import { StarGlyph } from '../../components/StarGlyph/StarGlyph.jsx';
import './BookingForm.css';

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    style: 'Fine Line',
    placement: '',
    size: 'Small (2-4 inches)',
    budget: '',
    date: '',
    idea: '',
    reference: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.placement.trim()) newErrors.placement = 'Target placement is required (e.g. inner forearm)';
    if (!formData.idea.trim()) newErrors.idea = 'Tell us a bit about your idea';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="booking-form__success" role="alert" aria-live="polite">
        <StarGlyph size={36} color="var(--crimson-400)" />
        <h2 className="booking-form__success-title">
          GOT IT. <br />
          <span className="text-stroke">TALK SOON</span>.
        </h2>
        <p className="booking-form__success-desc">
          Thanks, {formData.fullName}. We received your concept for a {formData.style} piece.
          Our studio coordinator will review placement notes and reach out within 24 hours to schedule your session.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              style: 'Fine Line',
              placement: '',
              size: 'Small (2-4 inches)',
              budget: '',
              date: '',
              idea: '',
              reference: null,
            });
          }}
          className="booking-form__reset-btn"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      {/* 2-col row: Name & Email */}
      <div className="booking-form__row">
        <div className="booking-form__group">
          <label htmlFor="fullName" className="booking-form__label">
            Full Name <span className="dot-crimson">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Maya Sen"
            className={`booking-form__input ${errors.fullName ? 'booking-form__input--error' : ''}`}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <span id="fullName-error" className="booking-form__error">{errors.fullName}</span>
          )}
        </div>

        <div className="booking-form__group">
          <label htmlFor="email" className="booking-form__label">
            Email Address <span className="dot-crimson">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="maya@example.com"
            className={`booking-form__input ${errors.email ? 'booking-form__input--error' : ''}`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="booking-form__error">{errors.email}</span>
          )}
        </div>
      </div>

      {/* 2-col row: Phone & Style */}
      <div className="booking-form__row">
        <div className="booking-form__group">
          <label htmlFor="phone" className="booking-form__label">
            Phone / WhatsApp <span className="dot-crimson">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98200 12345"
            className={`booking-form__input ${errors.phone ? 'booking-form__input--error' : ''}`}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <span id="phone-error" className="booking-form__error">{errors.phone}</span>
          )}
        </div>

        <div className="booking-form__group">
          <label htmlFor="style" className="booking-form__label">
            Preferred Style
          </label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="booking-form__input booking-form__select"
          >
            <option value="Fine Line">Fine Line</option>
            <option value="Black & Grey">Black & Grey Realism</option>
            <option value="Realism">Portrait Realism</option>
            <option value="Traditional">American Traditional</option>
            <option value="Blackwork">Ornamental Blackwork</option>
          </select>
        </div>
      </div>

      {/* 2-col row: Placement & Size */}
      <div className="booking-form__row">
        <div className="booking-form__group">
          <label htmlFor="placement" className="booking-form__label">
            Placement <span className="dot-crimson">*</span>
          </label>
          <input
            id="placement"
            type="text"
            name="placement"
            value={formData.placement}
            onChange={handleChange}
            placeholder="e.g. Left inner forearm, ribs, ankle"
            className={`booking-form__input ${errors.placement ? 'booking-form__input--error' : ''}`}
            aria-invalid={Boolean(errors.placement)}
            aria-describedby={errors.placement ? 'placement-error' : undefined}
          />
          {errors.placement && (
            <span id="placement-error" className="booking-form__error">{errors.placement}</span>
          )}
        </div>

        <div className="booking-form__group">
          <label htmlFor="size" className="booking-form__label">
            Approximate Size
          </label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="booking-form__input booking-form__select"
          >
            <option value="Tiny">Tiny (Under 2 inches)</option>
            <option value="Small">Small (2 - 4 inches)</option>
            <option value="Medium">Medium (4 - 7 inches)</option>
            <option value="Large">Large (Palm to Half-sleeve)</option>
            <option value="Sleeve">Full Sleeve / Back Piece</option>
          </select>
        </div>
      </div>

      {/* 2-col row: Budget & Preferred Date */}
      <div className="booking-form__row">
        <div className="booking-form__group">
          <label htmlFor="budget" className="booking-form__label">
            Budget Estimate
          </label>
          <input
            id="budget"
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g. Rs 5,000 - 10,000"
            className="booking-form__input"
          />
        </div>

        <div className="booking-form__group">
          <label htmlFor="date" className="booking-form__label">
            Preferred Date
          </label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="booking-form__input"
          />
        </div>
      </div>

      {/* Your Idea (Textarea) */}
      <div className="booking-form__group">
        <label htmlFor="idea" className="booking-form__label">
          Your Concept / Story <span className="dot-crimson">*</span>
        </label>
        <textarea
          id="idea"
          name="idea"
          rows={4}
          value={formData.idea}
          onChange={handleChange}
          placeholder="Describe the mood, subject, reference memories, or any existing tattoos we should work around..."
          className={`booking-form__input booking-form__textarea ${errors.idea ? 'booking-form__input--error' : ''}`}
          aria-invalid={Boolean(errors.idea)}
          aria-describedby={errors.idea ? 'idea-error' : undefined}
        />
        {errors.idea && (
          <span id="idea-error" className="booking-form__error">{errors.idea}</span>
        )}
      </div>

      {/* Styled Reference Upload */}
      <div className="booking-form__group">
        <label htmlFor="reference" className="booking-form__label">
          Visual References (Optional)
        </label>
        <div className="booking-form__file-wrap">
          <input
            id="reference"
            type="file"
            name="reference"
            accept="image/*"
            onChange={handleChange}
            className="booking-form__file-input"
          />
          <div className="booking-form__file-custom">
            <span>{formData.reference ? formData.reference.name : 'Choose image file or photo...'}</span>
            <span className="booking-form__file-btn">Browse</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="booking-form__submit">
        <Button type="submit" variant="primary">
          SEND IT
        </Button>
      </div>
    </form>
  );
};
