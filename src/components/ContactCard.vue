<script setup lang="ts">
import { ref } from 'vue'

const recipientEmail = 'kashankashi27@gmail.com'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('')

async function handleSubmit() {
  if (!form.value.email.trim() || !form.value.message.trim()) {
    status.value = 'error'
    errorMessage.value = 'Please provide both your email address and message.'
    return
  }

  status.value = 'submitting'
  errorMessage.value = ''

  try {
    const payload = {
      name: form.value.name.trim() || 'Anonymous visitor',
      email: form.value.email.trim(),
      phone: form.value.phone.trim() || 'Not provided',
      message: form.value.message.trim(),
      _subject: `New Portfolio Message from ${form.value.name.trim() || form.value.email.trim()}`,
      _captcha: 'false',
      _template: 'table',
    }

    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      status.value = 'success'
      form.value = { name: '', email: '', phone: '', message: '' }
    } else {
      throw new Error('Server returned an error status')
    }
  } catch {
    // If AJAX fails (e.g. offline or strict adblocker), fallback to mailto link
    status.value = 'error'
    errorMessage.value =
      'Direct transmission encountered an issue. You can click below to send via your email client directly.'
  }
}

function sendViaMailto() {
  const subject = encodeURIComponent(
    `Portfolio Inquiry from ${form.value.name || 'Visitor'}`
  )
  const body = encodeURIComponent(
    `Name: ${form.value.name}\nEmail: ${form.value.email}\nPhone: ${form.value.phone}\n\nMessage:\n${form.value.message}`
  )
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
}
</script>

<template>
  <div class="contact-card" aria-labelledby="contact-form-title">
    <h2 id="contact-form-title" class="contact-card-title">A note to Kashan</h2>

    <div v-if="status === 'success'" class="submission-feedback success">
      <div class="feedback-icon" aria-hidden="true">✓</div>
      <h3>Message sent successfully</h3>
      <p>
        Thank you for reaching out. Your note has been delivered directly to
        <strong>{{ recipientEmail }}</strong>.
      </p>
      <button class="reset-form-btn" @click="status = 'idle'">
        Send another note
      </button>
    </div>

    <form v-else class="contact-form" @submit.prevent="handleSubmit">
      <div class="field-group">
        <label for="contact-name">
          Your name <span class="label-hint">(optional)</span>
        </label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          placeholder="How should I address you?"
          autocomplete="name"
          :disabled="status === 'submitting'"
        />
      </div>

      <div class="field-group">
        <label for="contact-email">
          Email address <span class="label-hint req">(required)</span>
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          required
          placeholder="you@example.com"
          autocomplete="email"
          :disabled="status === 'submitting'"
        />
      </div>

      <div class="field-group">
        <label for="contact-phone">
          Phone number <span class="label-hint">(optional)</span>
        </label>
        <input
          id="contact-phone"
          v-model="form.phone"
          type="tel"
          placeholder="Include your country code"
          autocomplete="tel"
          :disabled="status === 'submitting'"
        />
      </div>

      <div class="field-group">
        <label for="contact-message">
          Your message <span class="label-hint req">(required)</span>
        </label>
        <textarea
          id="contact-message"
          v-model="form.message"
          required
          rows="5"
          placeholder="Tell me a little about what you have in mind..."
          :disabled="status === 'submitting'"
        />
      </div>

      <div v-if="status === 'error'" class="submission-feedback error">
        <p>{{ errorMessage }}</p>
        <button type="button" class="fallback-mail-btn" @click="sendViaMailto">
          Open default email client ↗
        </button>
      </div>

      <button
        type="submit"
        class="submit-button"
        :disabled="status === 'submitting'"
      >
        <span>{{ status === 'submitting' ? 'Sending note…' : 'Send message' }}</span>
        <span class="btn-arrow" aria-hidden="true">↗</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.contact-card {
  background: var(--surface, #18211e);
  border: 1px solid var(--line, #34463e);
  padding: 36px 32px;
  border-radius: 4px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.contact-card-title {
  font-size: clamp(1.8rem, 2.4vw, 2.2rem);
  font-weight: 500;
  color: #f3f5f3;
  margin-bottom: 26px;
  letter-spacing: -0.03em;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.9rem;
  color: #e0e5e2;
  font-weight: 450;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.label-hint {
  font-size: 0.78rem;
  color: #8c9992;
  font-weight: 400;
  font-family: var(--mono, monospace);
}

.label-hint.req {
  color: var(--accent);
}

input,
textarea {
  background: #111714;
  border: 1px solid var(--line, #34463e);
  border-radius: 2px;
  color: #eeeFE9;
  font-family: inherit;
  font-size: 0.95rem;
  padding: 13px 16px;
  transition: border-color 160ms ease, background-color 160ms ease;
  width: 100%;
}

input::placeholder,
textarea::placeholder {
  color: #55635c;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  background: #141b18;
}

textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.55;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: var(--accent);
  color: #121e1a;
  font-weight: 600;
  font-size: 1rem;
  padding: 15px 22px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 160ms ease, transform 120ms ease;
  margin-top: 6px;
}

.submit-button:hover:not(:disabled) {
  background: var(--accent-hover);
}

.submit-button:active:not(:disabled) {
  transform: translateY(1px);
}

.submit-button:disabled {
  opacity: 0.65;
  cursor: wait;
}

.btn-arrow {
  font-size: 1.15rem;
  line-height: 1;
  transition: transform 160ms ease;
}

.submit-button:hover:not(:disabled) .btn-arrow {
  transform: translate(2px, -2px);
}

.submission-feedback {
  padding: 24px 20px;
  border-radius: 2px;
  text-align: center;
}

.submission-feedback.success {
  background: #192721;
  border: 1px solid var(--accent);
}

.feedback-icon {
  width: 42px;
  height: 42px;
  line-height: 42px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: var(--accent);
  color: #141a19;
  font-size: 1.25rem;
  font-weight: bold;
}

.submission-feedback h3 {
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 8px;
}

.submission-feedback p {
  color: #b0b9b2;
  font-size: 0.9rem;
  line-height: 1.55;
  margin-bottom: 18px;
}

.reset-form-btn,
.fallback-mail-btn {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 8px 16px;
  font-size: 0.85rem;
  font-family: var(--mono);
  cursor: pointer;
  transition: all 160ms;
}

.reset-form-btn:hover,
.fallback-mail-btn:hover {
  background: var(--accent);
  color: var(--bg);
}

.submission-feedback.error {
  background: #2a1b18;
  border: 1px solid #78382c;
  color: #f0a89d;
  font-size: 0.85rem;
  text-align: left;
  padding: 14px;
}

.submission-feedback.error p {
  color: #f0a89d;
  margin-bottom: 10px;
}

@media (max-width: 760px) {
  .contact-card {
    padding: 24px 18px;
  }
}
</style>
