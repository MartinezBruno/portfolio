/*
  Contact form: client-side validation (ported from the prototype's validate())
  then a fetch POST to /api/contact. On success the form is swapped for the
  success state; "send another" resets it. Localized messages come from the
  form's data-* attributes so this stays language-agnostic.
*/
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const card = form.closest('.card') as HTMLElement | null;
  const success = card?.querySelector<HTMLElement>('[data-success]') ?? null;
  const sendAnother = card?.querySelector<HTMLButtonElement>('[data-send-another]') ?? null;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const formError = form.querySelector<HTMLElement>('[data-form-error]');

  const msgs = {
    required: form.dataset.errRequired ?? 'This field is required.',
    mail: form.dataset.errMail ?? 'Enter a valid email address.',
    short: form.dataset.errShort ?? 'Please write a little more.',
    server: form.dataset.errServer ?? 'Something went wrong. Please try again.',
    captcha: form.dataset.errCaptcha ?? 'Please complete the verification.',
    rate: form.dataset.errRate ?? 'Too many attempts. Please try again later.',
  };
  const lang = form.dataset.lang ?? 'en';
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const errEl = (key: string) =>
    form.querySelector<HTMLElement>(`[data-error="${key}"]`);
  const fieldEl = (name: string) =>
    form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);

  const clearErrors = () => {
    ['name', 'mail', 'message'].forEach((k) => {
      const el = errEl(k);
      if (el) el.textContent = '';
      fieldEl(k)?.removeAttribute('aria-invalid');
    });
    if (formError) {
      formError.textContent = '';
      formError.hidden = true;
    }
  };

  const showErrors = (errors: Record<string, string>) => {
    let firstKey: string | null = null;
    ['name', 'mail', 'message'].forEach((k) => {
      const el = errEl(k);
      const msg = errors[k];
      if (el) el.textContent = msg ?? '';
      if (msg) {
        fieldEl(k)?.setAttribute('aria-invalid', 'true');
        if (!firstKey) firstKey = k;
      } else {
        fieldEl(k)?.removeAttribute('aria-invalid');
      }
    });
    if (firstKey) fieldEl(firstKey)?.focus();
  };

  const validate = () => {
    const name = (fieldEl('name')?.value ?? '').trim();
    const mail = (fieldEl('mail')?.value ?? '').trim();
    const message = (fieldEl('message')?.value ?? '').trim();
    const errors: Record<string, string> = {};
    if (!name) errors.name = msgs.required;
    if (!mail) errors.mail = msgs.required;
    else if (!emailRe.test(mail)) errors.mail = msgs.mail;
    if (!message) errors.message = msgs.required;
    else if (message.length < 10) errors.message = msgs.short;
    return { errors, values: { name, mail, message } };
  };

  const setBusy = (busy: boolean) => {
    if (!submit) return;
    submit.disabled = busy;
    if (submitLabel) {
      submitLabel.textContent = busy
        ? submit.dataset.labelSending ?? 'Sending…'
        : submit.dataset.labelIdle ?? 'Submit';
    }
  };

  const showFormError = (text: string) => {
    if (!formError) return;
    formError.textContent = text;
    formError.hidden = false;
  };

  const showSuccess = () => {
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.querySelector<HTMLElement>('h3')?.setAttribute('tabindex', '-1');
      success.querySelector<HTMLElement>('h3')?.focus();
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const { errors, values } = validate();
    if (Object.keys(errors).length) {
      showErrors(errors);
      return;
    }

    // Honeypot: a filled "company" field means a bot — pretend success, send nothing.
    const honeypot = (fieldEl('company')?.value ?? '').trim();
    if (honeypot) {
      showSuccess();
      return;
    }

    // Cloudflare Turnstile injects a hidden input with the token once solved.
    const token = (
      form.querySelector<HTMLInputElement>('[name="cf-turnstile-response"]')?.value ?? ''
    ).trim();
    if (!token) {
      showFormError(msgs.captcha);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.mail,
          message: values.message,
          company: honeypot,
          token,
          lang,
        }),
      });
      const data = await res.json().catch(() => ({}) as Record<string, unknown>);

      if (res.ok && data && (data as { ok?: boolean }).ok) {
        showSuccess();
      } else if (res.status === 429) {
        showFormError(msgs.rate);
      } else if (data && (data as { errors?: Record<string, string> }).errors?.captcha) {
        showFormError(msgs.captcha);
      } else if (data && (data as { errors?: Record<string, string> }).errors) {
        // Server sends field codes, not localized text; re-derive localized
        // messages from the current values (rules are identical).
        const local = validate().errors;
        if (Object.keys(local).length) showErrors(local);
        else showFormError(msgs.server);
      } else {
        showFormError(msgs.server);
      }
    } catch {
      showFormError(msgs.server);
    } finally {
      setBusy(false);
      // Turnstile tokens are single-use — reset so the next submit gets a fresh one.
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    }
  });

  sendAnother?.addEventListener('click', () => {
    if (success) success.hidden = true;
    form.hidden = false;
    form.reset();
    clearErrors();
    fieldEl('name')?.focus();
  });
}
