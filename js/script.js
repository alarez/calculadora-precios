// --- Calculadora general ---
document.getElementById("btnCalcular").addEventListener("click", calcular);
document.getElementById("btnReset").addEventListener("click", resetear);

function calcular() {
    const precio = parseFloat(document.getElementById("precio").value);
    const iva = parseFloat(document.getElementById("iva").value);
    const ganancia = parseFloat(document.getElementById("ganancia").value);
    const redondeo = document.getElementById("redondeo").checked;

    if (isNaN(precio) || isNaN(ganancia)) {
        alert("Por favor, completa todos los campos numéricos.");
        return;
    }

    // 1️⃣ Calcular precio sin IVA con ganancia
    const precioSinIVA = precio * (1 + ganancia / 100);

    // 2️⃣ Calcular precio con IVA
    let precioConIVA = precioSinIVA * (1 + iva / 100);

    // 3️⃣ Redondear solo el precio con IVA (hacia arriba al múltiplo de 50)
    if (redondeo) {
        precioConIVA = Math.ceil(precioConIVA / 50) * 50;
    }

    // 4️⃣ Recalcular el precio sin IVA a partir del redondeado
    const precioSinIVARecalc = precioConIVA / (1 + iva / 100);

    // 5️⃣ Mostrar resultados con 3 decimales
    const resultadoSinIVA = `₡${precioSinIVARecalc.toFixed(3)}`;
    const resultadoConIVA = `₡${precioConIVA.toFixed(3)}`;

    const resultBox = document.getElementById("resultado");
    resultBox.innerHTML = `
    <div class="resultado-item" id="res-sin-iva" data-value="${resultadoSinIVA}">
      💰 <strong>Precio de venta sin IVA:</strong> ${resultadoSinIVA}
      <span class="hint">(Haz clic para copiar)</span>
    </div>
    <div class="resultado-item" id="res-con-iva" data-value="${resultadoConIVA}">
      🧾 <strong>Precio de venta con IVA:</strong> ${resultadoConIVA}
      <span class="hint">(Haz clic para copiar)</span>
    </div>
  `;
}

function resetear() {
    document.getElementById("resultado").textContent = "";
}

// --- Copiar resultados individualmente ---
document.getElementById("resultado").addEventListener("click", (e) => {
    const target = e.target.closest(".resultado-item");
    if (target && target.dataset.value) {
        const value = target.dataset.value;
        navigator.clipboard.writeText(value)
            .then(() => {
                const originalHTML = target.innerHTML;
                target.innerHTML = `✅ Copiado: ${value}`;
                setTimeout(() => {
                    target.innerHTML = originalHTML;
                }, 1200);
            })
            .catch(err => console.error("Error al copiar: ", err));
    }
});

// --- Calculadora por unidad ---
document.getElementById("btnCalcularUnidad").addEventListener("click", calcularUnidad);
document.getElementById("btnResetUnidad").addEventListener("click", () => {
    document.getElementById("resultadoUnidad").textContent = "";
});

function calcularUnidad() {
    const precio = parseFloat(document.getElementById("precioUnidad").value);
    const cantidad = parseFloat(document.getElementById("cantidadUnidad").value);
    const iva = parseFloat(document.getElementById("ivaUnidad").value);
    const ganancia = parseFloat(document.getElementById("gananciaUnidad").value);
    const redondeo = document.getElementById("redondeoUnidad").checked;

    if (isNaN(precio) || isNaN(cantidad) || isNaN(ganancia) || cantidad <= 0) {
        alert("Por favor, completa todos los campos correctamente (cantidad debe ser mayor que 0).");
        return;
    }

    // 1️⃣ Costo por unidad sin IVA
    const costoUnidad = precio / cantidad;

    // 2️⃣ Aplicar ganancia
    let precioSinIVA = costoUnidad * (1 + ganancia / 100);

    // 3️⃣ Calcular precio con IVA
    let precioConIVA = precioSinIVA * (1 + iva / 100);

    // 4️⃣ Redondear solo el precio con IVA
    if (redondeo) {
        precioConIVA = Math.ceil(precioConIVA / 50) * 50;
    }

    // 5️⃣ Recalcular sin IVA desde el valor redondeado
    precioSinIVA = precioConIVA / (1 + iva / 100);

    // 6️⃣ Mostrar resultados con 3 decimales
    const resultadoSinIVA = `₡${precioSinIVA.toFixed(3)}`;
    const resultadoConIVA = `₡${precioConIVA.toFixed(3)}`;

    const resultBox = document.getElementById("resultadoUnidad");
    resultBox.innerHTML = `
    <div class="resultado-item" id="res-sin-iva-u" data-value="${resultadoSinIVA}">
      💰 <strong>Precio por unidad sin IVA:</strong> ${resultadoSinIVA}
      <span class="hint">(Haz clic para copiar)</span>
    </div>
    <div class="resultado-item" id="res-con-iva-u" data-value="${resultadoConIVA}">
      🧾 <strong>Precio por unidad con IVA:</strong> ${resultadoConIVA}
      <span class="hint">(Haz clic para copiar)</span>
    </div>
  `;
}

// --- Copiar resultados por unidad ---
document.getElementById("resultadoUnidad").addEventListener("click", (e) => {
    const target = e.target.closest(".resultado-item");
    if (target && target.dataset.value) {
        const value = target.dataset.value;
        navigator.clipboard.writeText(value)
            .then(() => {
                const originalHTML = target.innerHTML;
                target.innerHTML = `✅ Copiado: ${value}`;
                setTimeout(() => {
                    target.innerHTML = originalHTML;
                }, 1200);
            })
            .catch(err => console.error("Error al copiar: ", err));
    }
});

// --- Tabs con URL hash ---
const tabGeneral = document.getElementById("tabGeneral");
const tabUnidades = document.getElementById("tabUnidades");
const titulo = document.querySelector("h1");

tabGeneral.addEventListener("click", () => switchTab("general", true));
tabUnidades.addEventListener("click", () => switchTab("unidades", true));

// Detectar tab inicial según hash
window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "unidades") {
        switchTab("unidades");
    } else {
        switchTab("general");
    }
});

// Cambiar pestañas y título dinámicamente
function switchTab(tab, updateHash = false) {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".calc-section").forEach(sec => sec.classList.remove("active"));

    if (tab === "general") {
        tabGeneral.classList.add("active");
        document.getElementById("calc-general").classList.add("active");
        titulo.textContent = "Calculadora de Precio de Venta";
    } else {
        tabUnidades.classList.add("active");
        document.getElementById("calc-unidades").classList.add("active");
        titulo.textContent = "Calculadora de Precio por Unidad";
    }

    if (updateHash) {
        history.pushState(null, "", `#${tab}`);
    }
}

// Detectar navegación por hash (atrás / adelante)
window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");
    switchTab(hash || "general");
});

// --- PWA Service Worker ---
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js");
    });
}
