(function () {
  const webhookUrl = 'https://script.google.com/macros/s/AKfycbz7QM7DhrccQApFwPjBpqE3imPUGFCyDIdhoaL6_f4jo3QqItMwSapUAs7s1v_u8Vic/exec';
  const form = document.getElementById('lead-form');
  const button = document.getElementById('submit-button');
  const message = document.getElementById('form-message');

  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
    };
  }

  function showMessage(type, text) {
    message.className = 'form-message ' + type;
    message.textContent = text;
  }

  if (!form) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get('name') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      consent: formData.get('consent') === 'on',
      website: String(formData.get('website') || '').trim(),
      page: window.location.href,
      ...getUtmParams(),
    };

    button.disabled = true;
    button.textContent = 'Отправляем...';
    message.className = 'form-message';
    message.textContent = '';

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      form.reset();
      showMessage('success', 'Спасибо, заявка отправлена. Мы свяжемся с вами перед вебинаром.');
    } catch (error) {
      showMessage('error', 'Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.');
    } finally {
      button.disabled = false;
      button.textContent = 'Зарегистрироваться';
    }
  });
})();
