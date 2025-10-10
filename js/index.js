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

      const originalText = btn.textContent;

      copyText(text)
        .then(() => {
          // эффект нажатия кнопки
          btn.classList.add("clicked");
          setTimeout(() => btn.classList.remove("clicked"), 150);

          // смена текста кнопки
          btn.textContent = "Скопійовано!";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 1500);

          // подсветка текста реквизита
          if (el) {
            el.classList.add("copied-text");
            setTimeout(() => el.classList.remove("copied-text"), 800);
          }
        })
        .catch(() => {
          btn.textContent = "Ошибка";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 1500);
        });
    });
  });
})();
