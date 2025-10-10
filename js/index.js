(function () {
  function copyText(text) {
    if (!text) return Promise.reject("No text");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    } else {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        var ok = document.execCommand("copy");
        document.body.removeChild(textArea);
        return ok ? Promise.resolve() : Promise.reject();
      } catch (err) {
        document.body.removeChild(textArea);
        return Promise.reject();
      }
    }
  }

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-copy-target");
      const el = document.getElementById(targetId);
      const text = el ? el.textContent.trim() : "";

      const originalText = btn.textContent; // сохраняем исходный текст кнопки

      copyText(text)
        .then(() => {
          // визуальный эффект нажатия
          btn.classList.add("clicked");
          setTimeout(() => btn.classList.remove("clicked"), 150);

          // меняем текст на "Скопировано!"
          btn.textContent = "Скопійовано!";
          setTimeout(() => {
            btn.textContent = originalText; // возвращаем исходный текст
          }, 1500);
        })
        .catch(() => {
          // при ошибке можно оставить кнопку без изменений или добавить сообщение
          btn.textContent = "Ошибка";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 1500);
        });
    });
  });
})();
