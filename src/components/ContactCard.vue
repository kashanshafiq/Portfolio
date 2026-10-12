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
  background: var(--surface);
  border: 1px solid var(--line);
  padding: 36px 32px;
  border-radius: 4px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

.contact-card-title {
  font-size: var(--text-subsection-title);
  font-weight: 580;
  line-height: 1.28;
  color: var(--text);
  margin-bottom: 24px;
  letter-spacing: -0.01em;
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
  font-size: var(--text-label, 0.9375rem);
  color: var(--text);
  font-weight: 500;
  line-height: 1.45;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.label-hint {
  font-size: var(--text-helper, 0.875rem);
  color: var(--muted);
  font-weight: 400;
  font-family: var(--mono);
}

.label-hint.req {
  color: var(--accent);
}

input,
textarea {
  background: var(--surface-input);
  border: 1px solid var(--line);
  border-radius: 2px;
  color: var(--text);
  font-family: inherit;
  font-size: var(--text-input, 1rem);
  line-height: 1.50;
  padding: 13px 16px;
  min-height: 44px;
  transition: border-color 160ms ease, background-color 160ms ease;
  width: 100%;
}

input::placeholder,
textarea::placeholder {
  color: rgba(185, 191, 188, 0.55);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  background: var(--surface);
}

textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 48px;
  background: var(--accent-primary);
  color: var(--text-on-primary);
  border: 1px solid var(--accent-primary-border);
  font-weight: 550;
  font-size: var(--text-btn, 1rem);
  line-height: 1.40;
  padding: 14px 22px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, transform 120ms ease;
  margin-top: 6px;
}

.submit-button:hover:not(:disabled) {
  background: var(--accent-primary-hover);
  border-color: var(--accent-hover);
  color: var(--text-on-primary);
}

.submit-button:active:not(:disabled) {
  background: var(--accent-primary-active);
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
  background: var(--success-bg);
  border: 1px solid var(--success-border);
}

.feedback-icon {
  width: 44px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: var(--text-on-primary);
  border: 1px solid var(--accent);
  font-size: 1.25rem;
  font-weight: bold;
}

.submission-feedback h3 {
  font-size: 1.3rem;
  color: var(--text);
  margin-bottom: 8px;
}

.submission-feedback p {
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 18px;
}

.reset-form-btn,
.fallback-mail-btn {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 10px 18px;
  min-height: 44px;
  min-width: 44px;
  font-size: 0.88rem;
  font-family: var(--mono);
  border-radius: 2px;
  cursor: pointer;
  transition: all 160ms ease;
}

.reset-form-btn:hover,
.fallback-mail-btn:hover {
  background: var(--accent-primary);
  color: var(--text-on-primary);
  border-color: var(--accent);
}

.submission-feedback.error {
  background: var(--error-bg);
  border: 1px solid var(--error-border);
  color: var(--error-text);
  font-size: 0.88rem;
  text-align: left;
  padding: 16px;
  border-radius: 2px;
}

.submission-feedback.error p {
  color: var(--error-text);
  margin-bottom: 12px;
  line-height: 1.55;
}

@media (max-width: 760px) {
  .contact-card {
    padding: 26px 20px;
    box-shadow: none;
  }
}
</style>
