import React from 'react';
import { Instagram, Youtube, MessageCircle, MapPin } from 'lucide-react';
import './StudioInfo.css';

export const StudioInfo = () => {
  return (
    <aside className="studio-info" aria-label="Studio Details & Location">
      {/* Interactive Google Map of Studio Location */}
      <div className="studio-info__map-wrap">
        <iframe
          title="INKED Tattoo Studio Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.94639908861!2d72.8258384!3d19.0552286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9197c36a495%3A0x6b4efca938002a24!2sBandra%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="studio-info__map"
        />
        <div className="studio-info__map-pin" aria-hidden="true">
          <MapPin size={16} color="var(--crimson-400)" />
          <span>42 Artisan Lane, Bandra West</span>
        </div>
      </div>

      <div className="studio-info__details">
        {/* Address */}
        <div className="studio-info__block">
          <span className="studio-info__label">STUDIO ADDRESS</span>
          <address className="studio-info__value">
            42 Artisan Lane, Heritage Courtyard<br />
            Bandra West, Mumbai, Maharashtra 400050
          </address>
        </div>

        {/* Hours */}
        <div className="studio-info__block">
          <span className="studio-info__label">HOURS OF OPERATION</span>
          <p className="studio-info__value">
            Monday – Saturday: 11:00 AM – 8:00 PM<br />
            Sundays: By Appointment & Guest Artist Drops
          </p>
        </div>

        {/* Contact Links */}
        <div className="studio-info__block">
          <span className="studio-info__label">DIRECT LINE</span>
          <p className="studio-info__value">
            <a href="tel:+919820045678" className="studio-info__link">+91 98200 45678</a><br />
            <a href="mailto:hello@inked.studio" className="studio-info__link">hello@inked.studio</a>
          </p>
        </div>

        {/* Social round outlined 44px buttons */}
        <div className="studio-info__block">
          <span className="studio-info__label">SOCIAL & CHAT</span>
          <div className="studio-info__socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="studio-info__social-btn"
              aria-label="Follow INKED on Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="studio-info__social-btn"
              aria-label="Watch INKED sessions on YouTube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="studio-info__social-btn"
              aria-label="Message INKED on WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};
