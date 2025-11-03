document.getElementById("btnCalcular").addEventListener("click", calcular);
document.getElementById("btnReset").addEventListener("click", resetear);

function calcular() {
    const precio = parseFloat(document.getElementById("precio").value);
    const iva = parseFloat(document.getElementById("iva").value);
    const ganancia = parseFloat(document.getElementById("ganancia").value);

    if (isNaN(precio) || isNaN(ganancia)) {
        alert("Por favor, completa todos los campos numéricos.");
        return;
    }

    // (A2*(1+C2/100))*(1+B2/100)
    const precioVenta = (precio * (1 + iva / 100)) * (1 + ganancia / 100);

    document.getElementById("resultado").innerHTML =
        `💰 Precio de venta sin IVA: ₡${precioVenta.toFixed(2)}`;
}

function resetear() {
    document.getElementById("resultado").innerHTML = "";
}

// --- PWA Service Worker ---
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js");
    });
}
