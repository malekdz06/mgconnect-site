const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("menu-open")) return;
    if (menu.contains(event.target) || menuButton.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}
const izemProducts = [
  { name: "Classic", family: "Classic", format: "can", image: "assets-web/izem-transparent/classic-50cl.png", href: "izem-classic.html" },
  { name: "Pomme Figue", family: "Classic", format: "can", image: "assets-web/izem-transparent/pomme-figue-50cl.png", href: "izem-pomme-figue.html" },
  { name: "Coco Myrtille", family: "Classic", format: "can", image: "assets-web/izem-transparent/coco-myrtille-50cl.png", href: "izem-coco-myrtille.html" },
  { name: "Pastèque Fraise", family: "Classic", format: "can", image: "assets-web/izem-transparent/pasteque-fraise-50cl.png", href: "izem-pasteque-fraise.html" },
  { name: "Cerise", family: "Classic", format: "can", image: "assets-web/izem-transparent/cerise-50cl.png", href: "izem-cerise.html" },
  { name: "Fraise Abricot", family: "Classic", format: "can", image: "assets-web/izem-transparent/fraise-abricot-25cl.png", href: "izem-fraise-abricot.html" },
  { name: "Grenade", family: "Classic", format: "can", image: "assets-web/izem-transparent/grenade-25cl.png", href: "izem-grenade.html" },
  { name: "Tropical", family: "Classic", format: "can", image: "assets-web/izem-transparent/tropical-25cl.png", href: "izem-tropical.html" },
  { name: "Mojito", family: "Juicy", format: "can", image: "assets-web/izem-transparent/mojito-25cl.png", href: "izem-mojito.html" },
  { name: "Fruits rouges", family: "Juicy", format: "can", image: "assets-web/izem-transparent/fruits-rouges-25cl.png", href: "izem-fruits-rouges.html" },
  { name: "Poire", family: "Juicy", format: "can", image: "assets-web/izem-transparent/poire-25cl.png", href: "izem-poire.html" },
  { name: "Zero Classic", family: "Zero", format: "can", image: "assets-web/izem-transparent/zero-classic-25cl.png", href: "izem-zero-classic.html" }
];

const izemCarousel = document.querySelector("[data-izem-carousel]");

if (izemCarousel) {
  const previousImage = izemCarousel.querySelector("[data-carousel-prev]");
  const activeImage = izemCarousel.querySelector("[data-carousel-active]");
  const nextImage = izemCarousel.querySelector("[data-carousel-next]");
  const previousButton = izemCarousel.querySelector("[data-carousel-prev-button]");
  const nextButton = izemCarousel.querySelector("[data-carousel-next-button]");
  const familyLabel = izemCarousel.querySelector("[data-carousel-family]");
  const nameLabel = izemCarousel.querySelector("[data-carousel-name]");
  const counterLabel = izemCarousel.querySelector("[data-carousel-counter]");
  const detailLink = document.querySelector("[data-carousel-link]");
  let activeIndex = 0;

  const wrapIndex = (index) => (index + izemProducts.length) % izemProducts.length;

  const setImage = (image, product) => {
    image.src = product.image;
    image.alt = `IZEM Energy ${product.name}`;
    image.classList.toggle("is-bottle-product", product.format === "bottle");
    image.classList.toggle("is-can-product", product.format !== "bottle");
  };

  const renderCarousel = () => {
    const product = izemProducts[activeIndex];
    const previousProduct = izemProducts[wrapIndex(activeIndex - 1)];
    const nextProduct = izemProducts[wrapIndex(activeIndex + 1)];

    setImage(previousImage, previousProduct);
    setImage(activeImage, product);
    setImage(nextImage, nextProduct);
    familyLabel.textContent = product.family;
    nameLabel.textContent = product.name;
    if (counterLabel) counterLabel.textContent = String(activeIndex + 1).padStart(2, "0") + " / " + izemProducts.length;
    if (detailLink) detailLink.href = product.href;

    izemCarousel.classList.remove("is-changing");
    activeImage.classList.remove("is-booming-a", "is-booming-b");
    void activeImage.offsetWidth;
    activeImage.classList.add(activeIndex % 2 === 0 ? "is-booming-a" : "is-booming-b");
    izemCarousel.classList.add("is-changing");
  };

  previousButton.addEventListener("click", () => {
    activeIndex = wrapIndex(activeIndex - 1);
    renderCarousel();
  });

  nextButton.addEventListener("click", () => {
    activeIndex = wrapIndex(activeIndex + 1);
    renderCarousel();
  });

  izemCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") previousButton.click();
    if (event.key === "ArrowRight") nextButton.click();
  });

  renderCarousel();
}








const formatSwitchers = document.querySelectorAll("[data-format-switcher]");

formatSwitchers.forEach((switcher) => {
  const image = switcher.querySelector("[data-format-image]");
  const buttons = switcher.querySelectorAll("[data-format-src]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!image) return;
      image.src = button.dataset.formatSrc;
      image.alt = button.dataset.formatAlt || image.alt;

      buttons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");

      image.classList.remove("is-format-changing");
      void image.offsetWidth;
      image.classList.add("is-format-changing");
    });
  });
});



const mailForms = document.querySelectorAll("[data-mail-form]");

mailForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const subject = form.dataset.formTitle || "Demande MG Connect";
    const lines = [subject, ""];
    const fields = form.querySelectorAll("input, textarea, select");

    fields.forEach((field) => {
      if (!field.name) return;
      if (field.type === "file") {
        const fileName = field.files && field.files.length ? field.files[0].name : "Aucun fichier joint";
        lines.push(`${field.name}: ${fileName}`);
        return;
      }
      lines.push(`${field.name}: ${field.value}`);
    });

    const mailto = `mailto:contact@mgconnect.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
  });
});
