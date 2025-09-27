import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import './Settings.css';

export const Settings: React.FC = () => {
  const { palette, setPalette, period, isDayMode, toggleDayNight } = useTheme();
  const { currency, setCurrency } = useCurrency();

  const palettes = [
    { id: 'original', name: 'Original', emoji: '🎨', description: 'Clean and minimal design' },
    { id: 'warm', name: 'Warm', emoji: '🌅', description: 'Cozy and inviting tones' },
    { id: 'ocean', name: 'Ocean', emoji: '🌊', description: 'Cool and refreshing blues' },
    { id: 'sunset', name: 'Sunset', emoji: '🌇', description: 'Warm and vibrant colors' }
  ] as const;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Customize your experience</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Theme & Appearance</h2>
          <p>Choose your preferred color palette</p>
          
          <div className="theme-options">
            {palettes.map((p) => (
              <div
                key={p.id}
                className={`theme-option ${palette === p.id ? 'active' : ''}`}
                onClick={() => setPalette(p.id)}
              >
                <div className="theme-option-header">
                  <span className="theme-emoji">{p.emoji}</span>
                  <span className="theme-name">{p.name}</span>
                </div>
                <p className="theme-description">{p.description}</p>
                {palette === p.id && (
                  <div className="active-indicator">✓ Active</div>
                )}
              </div>
            ))}
          </div>
        </div>

               <div className="settings-section">
                 <h2>Day & Night Mode</h2>
                 <p>Toggle between day and night modes for better viewing experience.</p>

                 <div className="day-night-toggle">
                   <div className="toggle-container">
                     <button
                       className={`toggle-btn ${isDayMode ? 'active' : ''}`}
                       onClick={() => toggleDayNight()}
                     >
                       <span className="toggle-icon">☀️</span>
                       <span className="toggle-label">Day Mode</span>
                     </button>
                     <button
                       className={`toggle-btn ${!isDayMode ? 'active' : ''}`}
                       onClick={() => toggleDayNight()}
                     >
                       <span className="toggle-icon">🌙</span>
                       <span className="toggle-label">Night Mode</span>
                     </button>
                   </div>
                   <div className="current-mode">
                     <span>Current mode: <strong>{isDayMode ? 'Day' : 'Night'}</strong></span>
                   </div>
                 </div>
               </div>

               <div className="settings-section">
                 <h2>Currency Settings</h2>
                 <p>Choose your preferred currency for financial tracking.</p>

                 <div className="currency-selection">
                   <div className="currency-options">
                     <button
                       className={`currency-btn ${currency === 'USD' ? 'active' : ''}`}
                       onClick={() => setCurrency('USD')}
                     >
                       <span className="currency-symbol">$</span>
                       <span className="currency-name">USD (US Dollar)</span>
                     </button>
                     <button
                       className={`currency-btn ${currency === 'EUR' ? 'active' : ''}`}
                       onClick={() => setCurrency('EUR')}
                     >
                       <span className="currency-symbol">€</span>
                       <span className="currency-name">EUR (Euro)</span>
                     </button>
                     <button
                       className={`currency-btn ${currency === 'GBP' ? 'active' : ''}`}
                       onClick={() => setCurrency('GBP')}
                     >
                       <span className="currency-symbol">£</span>
                       <span className="currency-name">GBP (British Pound)</span>
                     </button>
                     <button
                       className={`currency-btn ${currency === 'JPY' ? 'active' : ''}`}
                       onClick={() => setCurrency('JPY')}
                     >
                       <span className="currency-symbol">¥</span>
                       <span className="currency-name">JPY (Japanese Yen)</span>
                     </button>
                     <button
                       className={`currency-btn ${currency === 'CAD' ? 'active' : ''}`}
                       onClick={() => setCurrency('CAD')}
                     >
                       <span className="currency-symbol">C$</span>
                       <span className="currency-name">CAD (Canadian Dollar)</span>
                     </button>
                     <button
                       className={`currency-btn ${currency === 'CNY' ? 'active' : ''}`}
                       onClick={() => setCurrency('CNY')}
                     >
                       <span className="currency-symbol">¥</span>
                       <span className="currency-name">CNY (Chinese Yuan)</span>
                     </button>
                   </div>
                   <div className="current-currency">
                     <span>Current currency: <strong>{currency}</strong></span>
                   </div>
                 </div>
               </div>

        <div className="settings-section">
          <h2>Current Theme Info</h2>
          <div className="theme-info">
            <div className="info-item">
              <span className="info-label">Active Palette:</span>
              <span className="info-value">{palettes.find(p => p.id === palette)?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Time Period:</span>
              <span className="info-value capitalize">{period}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Auto Theme:</span>
              <span className="info-value">Based on time of day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
