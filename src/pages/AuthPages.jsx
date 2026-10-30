import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ background: 'linear-gradient(135deg,#020818 0%,#060f2e 50%,#0a1840 100%)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: '#2457d4' }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: '#10b981' }} />

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2457d4,#10b981)' }}>
              <Shield size={26} color="#fff" />
            </div>
            <div className="text-left">
              <div className="font-bold text-white text-xl" style={{ fontFamily: 'Outfit,sans-serif' }}>AICTE Sentinel</div>
              <div className="text-xs" style={{ color: 'rgba(240,244,255,0.5)' }}>Regulatory Intelligence Platform</div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Outfit,sans-serif' }}>{title}</h1>
          <p className="text-sm" style={{ color: 'rgba(240,244,255,0.6)' }}>{subtitle}</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8" style={{ background: 'rgba(10,24,64,0.8)', border: '1px solid rgba(59,110,232,0.25)', backdropFilter: 'blur(20px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function InputField({ id, label, type = 'text', value, onChange, placeholder, icon: Icon, error, ...rest }) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';
  const actualType = isPassword ? (showPass ? 'text' : 'password') : type;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,255,0.8)' }}>{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Icon size={16} style={{ color: error ? '#f87171' : 'rgba(107,147,240,0.7)' }} />
          </div>
        )}
        <input
          id={id}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
          style={{ paddingLeft: Icon ? '40px' : '16px', paddingRight: isPassword ? '44px' : '16px', borderColor: error ? 'rgba(239,68,68,0.5)' : undefined }}
          {...rest}
        />
        {isPassword && (
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPass(p => !p)}
            style={{ color: 'rgba(107,147,240,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle size={12} style={{ color: '#f87171' }} />
          <span className="text-xs" style={{ color: '#f87171' }}>{error}</span>
        </div>
      )}
    </div>
  );
}

// ─────────── LOGIN PAGE ────────────
export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    setErrors({});
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 800));
    navigate('/institution/dashboard');
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your institution portal">
      {success ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <CheckCircle size={32} style={{ color: '#10b981' }} />
          </div>
          <div className="font-semibold text-white mb-1">Login Successful!</div>
          <div className="text-sm" style={{ color: 'rgba(240,244,255,0.6)' }}>Redirecting to your dashboard...</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <InputField id="email" label="Email Address" type="email" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            placeholder="principal@institution.ac.in" icon={Mail} error={errors.email} />
          <InputField id="password" label="Password" type="password" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            placeholder="Enter your password" icon={Lock} error={errors.password} />

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
                className="w-4 h-4 rounded" style={{ accentColor: '#2457d4' }} />
              <span className="text-sm" style={{ color: 'rgba(240,244,255,0.7)' }}>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm font-medium transition-colors" style={{ color: '#6b93f0' }}>Forgot password?</Link>
          </div>

          <button type="submit" className="btn-primary w-full justify-center text-base py-3" disabled={loading}
            style={{ opacity: loading ? 0.8 : 1 }}>
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </span>
            ) : 'Sign In to Portal'}
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm" style={{ color: 'rgba(240,244,255,0.5)' }}>Demo: Use any email & password (6+ chars)</span>
          </div>

          <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: 'rgba(59,110,232,0.15)' }}>
            <span className="text-sm" style={{ color: 'rgba(240,244,255,0.6)' }}>
              New institution?{' '}
              <Link to="/register" className="font-semibold transition-colors" style={{ color: '#6b93f0' }}>Register here</Link>
            </span>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}

// ─────────── REGISTER PAGE ────────────
const STEPS = ['Institution Details', 'Contact Information', 'Account Setup'];

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    institutionName: '', type: '', affiliationNo: '', state: '', district: '',
    principalName: '', email: '', phone: '', address: '',
    password: '', confirmPassword: '', agree: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.institutionName) e.institutionName = 'Institution name is required';
      if (!form.type) e.type = 'Select institution type';
      if (!form.state) e.state = 'Select state';
    }
    if (step === 1) {
      if (!form.principalName) e.principalName = 'Name is required';
      if (!form.email) e.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter valid email';
      if (!form.phone) e.phone = 'Phone is required';
    }
    if (step === 2) {
      if (!form.password) e.password = 'Password is required';
      else if (form.password.length < 8) e.password = 'Minimum 8 characters';
      if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
      else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
      if (!form.agree) e.agree = 'You must agree to the terms';
    }
    return e;
  };

  const next = () => {
    const e = validateStep();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStep(p => p + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validateStep();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
  };

  const institutionTypes = ['University', 'Deemed University', 'Autonomous College', 'Affiliated College', 'Polytechnic', 'Stand-alone Institution'];
  const states = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];

  if (success) {
    return (
      <AuthLayout title="Registration Successful!" subtitle="Your institution account has been created">
        <div className="text-center py-4">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <CheckCircle size={40} style={{ color: '#10b981' }} />
          </div>
          <p className="mb-2 font-semibold text-white">Account Created Successfully!</p>
          <p className="text-sm mb-2" style={{ color: 'rgba(240,244,255,0.6)' }}>
            Your institution has been registered. An email with verification link has been sent to <strong style={{ color: '#6b93f0' }}>{form.email}</strong>.
          </p>
          <p className="text-sm mb-8" style={{ color: 'rgba(240,244,255,0.5)' }}>
            Your application will be reviewed within 2-3 business days.
          </p>
          <button className="btn-primary w-full justify-center" onClick={() => navigate('/login')}>
            Sign In to Portal
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Register Institution" subtitle="Create your AICTE Sentinel account">
      {/* Step Indicators */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                style={{
                  background: i < step ? '#10b981' : i === step ? '#2457d4' : 'rgba(59,110,232,0.15)',
                  color: i <= step ? '#fff' : 'rgba(240,244,255,0.4)',
                  border: i === step ? '2px solid #3b6ee8' : '2px solid transparent',
                }}>
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block" style={{ color: i === step ? '#6b93f0' : 'rgba(240,244,255,0.4)' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 transition-all duration-300" style={{ background: i < step ? '#10b981' : 'rgba(59,110,232,0.2)' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 0 */}
        {step === 0 && (
          <div className="animate-fade-in-up">
            <InputField id="institutionName" label="Institution Name *" value={form.institutionName}
              onChange={e => update('institutionName', e.target.value)} placeholder="e.g. National Institute of Technology" error={errors.institutionName} />
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,255,0.8)' }}>Institution Type *</label>
              <select value={form.type} onChange={e => update('type', e.target.value)} className="input-field"
                style={{ borderColor: errors.type ? 'rgba(239,68,68,0.5)' : undefined }}>
                <option value="">Select type...</option>
                {institutionTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.type}</p>}
            </div>
            <InputField id="affiliationNo" label="Affiliation / Registration No." value={form.affiliationNo}
              onChange={e => update('affiliationNo', e.target.value)} placeholder="e.g. AICTE/2024/001" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,255,0.8)' }}>State *</label>
                <select value={form.state} onChange={e => update('state', e.target.value)} className="input-field"
                  style={{ borderColor: errors.state ? 'rgba(239,68,68,0.5)' : undefined }}>
                  <option value="">Select...</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,255,0.8)' }}>District</label>
                <input value={form.district} onChange={e => update('district', e.target.value)} className="input-field" placeholder="District" />
              </div>
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <InputField id="principalName" label="Principal / Director Name *" value={form.principalName}
              onChange={e => update('principalName', e.target.value)} placeholder="Dr. Full Name" error={errors.principalName} />
            <InputField id="email" label="Official Email Address *" type="email" value={form.email}
              onChange={e => update('email', e.target.value)} placeholder="principal@institution.ac.in" icon={Mail} error={errors.email} />
            <InputField id="phone" label="Contact Phone Number *" type="tel" value={form.phone}
              onChange={e => update('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" error={errors.phone} />
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgba(240,244,255,0.8)' }}>Institutional Address</label>
              <textarea value={form.address} onChange={e => update('address', e.target.value)} className="input-field" rows={3} placeholder="Full address with pin code" style={{ resize: 'none' }} />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <InputField id="password" label="Create Password *" type="password" value={form.password}
              onChange={e => update('password', e.target.value)} placeholder="Minimum 8 characters" icon={Lock} error={errors.password} />
            {form.password && (
              <div className="flex gap-1 mb-4 -mt-3">
                {['Length', 'Uppercase', 'Number', 'Symbol'].map((label, i) => {
                  const checks = [form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), /[^A-Za-z0-9]/.test(form.password)];
                  return (
                    <div key={label} className="flex-1">
                      <div className="h-1 rounded-full mb-1" style={{ background: checks[i] ? '#10b981' : 'rgba(59,110,232,0.2)' }} />
                      <span className="text-xs" style={{ color: checks[i] ? '#34d399' : 'rgba(240,244,255,0.3)' }}>{label}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <InputField id="confirmPassword" label="Confirm Password *" type="password" value={form.confirmPassword}
              onChange={e => update('confirmPassword', e.target.value)} placeholder="Re-enter your password" icon={Lock} error={errors.confirmPassword} />
            <label className="flex items-start gap-3 cursor-pointer mb-2">
              <input type="checkbox" checked={form.agree} onChange={e => update('agree', e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded flex-shrink-0" style={{ accentColor: '#2457d4' }} />
              <span className="text-sm" style={{ color: 'rgba(240,244,255,0.7)' }}>
                I agree to the <a href="#" className="underline" style={{ color: '#6b93f0' }}>Terms of Service</a> and{' '}
                <a href="#" className="underline" style={{ color: '#6b93f0' }}>Privacy Policy</a>
              </span>
            </label>
            {errors.agree && <p className="text-xs" style={{ color: '#f87171' }}>{errors.agree}</p>}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className={`flex gap-3 mt-6 ${step > 0 ? 'justify-between' : 'justify-end'}`}>
          {step > 0 && (
            <button type="button" className="btn-secondary" onClick={() => { setStep(p => p - 1); setErrors({}); }}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" className="btn-primary flex-1 justify-center" onClick={next}>
              Continue
            </button>
          ) : (
            <button type="submit" className="btn-accent flex-1 justify-center" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : 'Create Account'}
            </button>
          )}
        </div>

        <div className="mt-6 pt-6 border-t text-center" style={{ borderColor: 'rgba(59,110,232,0.15)' }}>
          <span className="text-sm" style={{ color: 'rgba(240,244,255,0.6)' }}>
            Already registered?{' '}
            <Link to="/login" className="font-semibold" style={{ color: '#6b93f0' }}>Sign In</Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}

// ─────────── FORGOT PASSWORD PAGE ────────────
export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('request'); // request | sent
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep('sent');
  };

  return (
    <AuthLayout
      title={step === 'request' ? 'Forgot Password?' : 'Check Your Email'}
      subtitle={step === 'request' ? "We'll send you reset instructions" : 'Reset link sent successfully'}
    >
      {step === 'request' ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-6 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(36,87,212,0.1)', border: '1px solid rgba(59,110,232,0.2)' }}>
            <AlertCircle size={18} style={{ color: '#6b93f0', flexShrink: 0, marginTop: 2 }} />
            <p className="text-sm" style={{ color: 'rgba(240,244,255,0.7)' }}>
              Enter your registered email address and we'll send you a link to reset your password.
            </p>
          </div>
          <InputField id="forgot-email" label="Registered Email Address" type="email" value={email}
            onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="principal@institution.ac.in"
            icon={Mail} error={error} />
          <button type="submit" className="btn-primary w-full justify-center text-base py-3" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Reset Link...
              </span>
            ) : 'Send Reset Link'}
          </button>
          <div className="mt-6 text-center">
            <button type="button" onClick={() => navigate('/login')} className="flex items-center gap-2 mx-auto text-sm transition-colors"
              style={{ color: 'rgba(240,244,255,0.6)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <ArrowLeft size={14} /> Back to Login
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <CheckCircle size={40} style={{ color: '#10b981' }} />
          </div>
          <p className="mb-2 font-semibold text-white">Email Sent!</p>
          <p className="text-sm mb-2" style={{ color: 'rgba(240,244,255,0.6)' }}>
            A password reset link has been sent to <strong style={{ color: '#6b93f0' }}>{email}</strong>.
          </p>
          <p className="text-sm mb-8" style={{ color: 'rgba(240,244,255,0.5)' }}>The link expires in 30 minutes. Check your spam folder if you don't receive it.</p>
          <button className="btn-secondary w-full justify-center" onClick={() => navigate('/login')}>
            <ArrowLeft size={14} /> Return to Login
          </button>
        </div>
      )}
    </AuthLayout>
  );
}
