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
  const copyAllBtn = document.getElementById("copy-all-btn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", () => {
      const ibanEl = document.getElementById("iban");
      const edrpouEl = document.getElementById("edrpou");

      const ibanText = ibanEl ? ibanEl.textContent.trim() : "";
      const edrpouText = edrpouEl ? edrpouEl.textContent.trim() : "";

      const combinedText = `IBAN: ${ibanText}\nЄДРПОУ: ${edrpouText}`;
      const originalText = copyAllBtn.textContent;

      copyText(combinedText)
        .then(() => {
          // эффект нажатия кнопки
          copyAllBtn.classList.add("clicked");
          setTimeout(() => copyAllBtn.classList.remove("clicked"), 150);

          // смена текста кнопки
          copyAllBtn.textContent = "Скопійовано!";
          setTimeout(() => {
            copyAllBtn.textContent = originalText;
          }, 1500);

          // подсветка обоих элементов
          if (ibanEl) {
            ibanEl.classList.add("copied-text");
            setTimeout(() => ibanEl.classList.remove("copied-text"), 800);
          }
          if (edrpouEl) {
            edrpouEl.classList.add("copied-text");
            setTimeout(() => edrpouEl.classList.remove("copied-text"), 800);
          }
        })
        .catch(() => {
          copyAllBtn.textContent = "Ошибка";
          setTimeout(() => {
            copyAllBtn.textContent = originalText;
          }, 1500);
        });
    });
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
