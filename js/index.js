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

  function showToast(message = "Скопійовано!", duration = 1500) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), duration);
  }

  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-copy-target");
      const el = document.getElementById(targetId);
      const text = el ? el.textContent.trim() : "";
      copyText(text)
        .then(() => showToast("Скопійовано!"))
        .catch(() => showToast("Не вдалося скопіювати", 1800));
    });
  });
})();
