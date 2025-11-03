# 🧾 Calculadora de Precio de Venta (PWA)

Una **aplicación web progresiva (PWA)** que permite calcular el precio de venta sin IVA de un producto con base en su costo, el porcentaje de IVA (según Hacienda de Costa Rica) y el margen de ganancia deseado.  
Funciona offline, se puede instalar en dispositivos móviles y tiene diseño adaptable.

---

## 🚀 Características

- Cálculo instantáneo del precio de venta sin IVA.  
- Campos configurables:
  - Precio de compra (sin IVA)
  - Porcentaje de IVA (menú desplegable con tasas de Costa Rica)
  - Porcentaje de ganancia
- Botón de **reset** para limpiar el formulario.
- Funciona **sin conexión** gracias al *Service Worker*.
- Instalación como **PWA** en escritorio o dispositivos móviles.
- Incluye íconos y favicon personalizados.

---

## 📁 Estructura del proyecto

```
pwa-calculadora/
│
├── index.html
├── manifest.json
├── service-worker.js
│
├── /css/
│   └── style.css
│
├── /js/
│   └── script.js
│
├── icon-192.png
└── icon-512.png
```

---

## ⚙️ Instalación local

1. Clona o descarga este repositorio.  
2. Abre la carpeta en tu entorno local o servidor.  
3. Ejecuta un servidor simple (por ejemplo con Python):

   ```bash
   python3 -m http.server 8080
   ```

4. Abre en tu navegador:  
   👉 [http://localhost:8080](http://localhost:8080)

5. Si todo está correcto, podrás **instalar la PWA** desde el navegador.

---

## 💡 Uso

1. Ingresa el **precio de compra sin IVA**.  
2. Selecciona el **% de IVA** según el tipo de producto o servicio.  
3. Indica el **% de ganancia** deseado.  
4. Presiona **Calcular**.  
5. El sistema mostrará el **precio de venta sin IVA**, que tu POS podrá usar para agregar el IVA automáticamente.  
6. Usa el botón **Reset** para limpiar el formulario.

---

## 🧮 Fórmula utilizada

```
Precio Venta Sin IVA = (PrecioCompra × (1 + IVA/100)) × (1 + Ganancia/100)
```

---

## 📦 Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6)  
- PWA (Service Worker + Manifest)

---

## 🧰 Créditos

Desarrollado por **Alain Martínez (ParallelDevs)**  
Icono minimalista azul diseñado con IA por ChatGPT.
