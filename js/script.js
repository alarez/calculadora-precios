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

    // Precio base
    const precioSinIVA = precio * (1 + ganancia / 100);
    const precioConIVA = precioSinIVA * (1 + iva / 100);

    // Aplicar redondeo si está activo
    const precioSinIVARed = redondeo ? redondear(precioSinIVA) : precioSinIVA;
    const precioConIVARed = redondeo ? redondear(precioConIVA) : precioConIVA;

    const resultadoSinIVA = `₡${precioSinIVARed.toFixed(2)}`;
    const resultadoConIVA = `₡${precioConIVARed.toFixed(2)}`;

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

// Redondea al múltiplo más cercano de 100
function redondear(valor) {
    return Math.round(valor / 100) * 100;
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

// --- PWA Service Worker ---
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js");
    });
}

// --- Tabs ---
const tabGeneral = document.getElementById("tabGeneral");
const tabUnidades = document.getElementById("tabUnidades");

tabGeneral.addEventListener("click", () => switchTab("general"));
tabUnidades.addEventListener("click", () => switchTab("unidades"));

function switchTab(tab) {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".calc-section").forEach(sec => sec.classList.remove("active"));

    if (tab === "general") {
        tabGeneral.classList.add("active");
        document.getElementById("calc-general").classList.add("active");
    } else {
        tabUnidades.classList.add("active");
        document.getElementById("calc-unidades").classList.add("active");
    }
}

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

    if (isNaN(precio) || isNaN(cantidad) || isNaN(ganancia)) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const costoUnidad = precio / cantidad;
    const precioSinIVA = costoUnidad * (1 + ganancia / 100);
    const precioConIVA = precioSinIVA * (1 + iva / 100);

    const finalSinIVA = redondeo ? redondear(precioSinIVA) : precioSinIVA;
    const finalConIVA = redondeo ? redondear(precioConIVA) : precioConIVA;

    const resultadoSinIVA = `₡${finalSinIVA.toFixed(2)}`;
    const resultadoConIVA = `₡${finalConIVA.toFixed(2)}`;

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
