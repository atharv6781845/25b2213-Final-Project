import React, { useState, useEffect } from 'react';

export default function App() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', date: '', slot: '' });
    const [status, setStatus] = useState('');

    // Target your local Django server URL for now
    const API_BASE = "http://localhost:8000/api";

    // 1. Fetch live doctors from database upon load
    useEffect(() => {
        fetch(`${API_BASE}/doctors/`)
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(err => console.error("Error connecting to backend:", err));
    }, []);

    // 2. Handle Booking form submission to Django API
    const handleBooking = (e) => {
        e.preventDefault();
        if (!selectedDoctor) return;

        const payload = {
            patient_name: formData.name,
            patient_email: formData.email,
            doctor: selectedDoctor.id,
            date: formData.date,
            time_slot: formData.slot
        };

        fetch(`${API_BASE}/appointments/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if(res.ok) {
                setStatus('Appointment Booked Successfully!');
                setFormData({ name: '', email: '', date: '', slot: '' });
                setSelectedDoctor(null);
            } else {
                setStatus('Error processing booking. Try again.');
            }
        });
    };

    return (
        <div className="hospital-dashboard">
          <>
            {/* Running Emergency Ticker Line */}
            <div className="emergency-ticker">
                <div className="ticker-wrap">
                    {/* Group 1 */}
                    <div className="ticker-group">
                        <span className="ticker-item">🚨 EMERGENCY ER OPEN 24/7: +1 (555) 911-0000</span>
                        <span className="ticker-item">⚠️ AMBULANCE DISPATCH ALL ZONES: +1 (555) 911-1111</span>
                        <span className="ticker-item">💉 BLOOD DONATION DRIVE THIS WEEKEND AT WING B</span>
                    </div>
                    {/* Same as Above Group 1 to catch the tail and create an infinite loop */}
                    <div className="ticker-group">
                        <span className="ticker-item">🚨 EMERGENCY ER OPEN 24/7: +1 (555) 911-0000</span>
                        <span className="ticker-item">⚠️ AMBULANCE DISPATCH ALL ZONES: +1 (555) 911-1111</span>
                        <span className="ticker-item">💉 BLOOD DONATION DRIVE THIS WEEKEND AT WING B</span>
                    </div>
                </div>
            </div>
          </> 
            <div className="header">
                <h1>NYC General Hospital</h1>
                <p>Find specialized medical practitioners and book instant consultations</p>
            </div>

            <div className="main-content">
                {/* Left Side: Live Directory */}
                <div className="card">
                    <h2>Our Medical Specialists</h2>
                    <p style={{color: '#64748b'}}>Select a physician to initiate an appointment booking</p>
                    <div className="doctor-grid">
                        {doctors.map(doc => (
                            <div 
                                key={doc.id} 
                                className={`doctor-card ${selectedDoctor?.id === doc.id ? 'selected' : ''}`}
                                onClick={() => setSelectedDoctor(doc)}
                                style={{ display: 'flex', gap: '16px', alignItems: 'center' }} // Flex alignment for image

                            >
                                <img 
                                    src={doc.id == 1 && "../../public/images/Robert De Niro.jpg" || doc.id == 2 && "../../public/images/Al Pacino.jpg" || doc.id == 3 && "../../public/images/Jake Gyllenhall.jpg" || doc.id == 4 && "../../public/images/Leonardo DiCaprio.jpg" || doc.id == 5 && "../../public/images/Brad Pitt.jpg" || doc.id == 6 && "../../public/images/Johnny Depp.jpg"} 
                                    alt="Doctor Avatar" 
                                    style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#e2e8f0', padding: '4px' }}
                                />
                                
                                <div>
                                    <h3 style={{ margin: '0 0 4px 0' }}>{doc.name}</h3>
                                    <p className="badge">{doc.specialization}</p>
                                    <p style={{fontSize: '0.85rem', color: '#64748b', marginTop: '8px', marginBottom: 0}}>
                                        <p>📆 Days : {doc.availability_days} </p><p>🕘 Hours: {doc.availability_time}</p>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Interactive Booking Engine */}
                <div className="card">
                    <h2>Appointment Engine</h2>
                    {status && <div className="success-message">{status}</div>}
                    
                    <form onSubmit={handleBooking}>
                        <div className="form-group">
                            <label>Selected Physician</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={selectedDoctor ? `${selectedDoctor.name} (${selectedDoctor.specialization})` : 'Please choose a specialist'} 
                                disabled 
                            />
                        </div>
                        <div className="form-group">
                            <label>Patient Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                required 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                required 
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Desired Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                required 
                                value={formData.date}
                                onChange={e => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label>Preferred Time Slot</label>
                            <select 
                                className="form-control" 
                                required
                                value={formData.slot}
                                onChange={e => setFormData({...formData, slot: e.target.value})}
                            >
                                <option value="">Select a slot</option>
                                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                            </select>
                        </div>
                        <button type="submit" className="btn" disabled={!selectedDoctor}>
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>

            {/* Premium Contact Us Bar at Bottom */}
            <footer className="hospital-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>📍 Contact Us & Location</h4>
                        <p>451 Clarkson Avenue, Brooklyn, NY 11203</p>
                        <p>📧 Email: support@nycgeneralhospital.com</p>
                    </div>
                    <div className="footer-section" style={{ textAlign: 'center' }}>
                        <h4>📞 General Helpline</h4>
                        <p style={{ color: '#3b82f6', fontWeight: '600', fontSize: '1.1rem' }}>+1 (555) 019-2834</p>
                    </div>
                    <div className="footer-section" style={{ textAlign: 'right' }}>
                        <div className="emergency-badge">
                            🚨 24/7 Emergency Room: +1 (555) 911-0000
                        </div>
                        <p style={{ fontSize: '0.8rem', marginTop: '8px' }}>© 2026 City Care General Hospital. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}