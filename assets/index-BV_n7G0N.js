(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))i(c);new MutationObserver(c=>{for(const r of c)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function u(c){const r={};return c.integrity&&(r.integrity=c.integrity),c.referrerPolicy&&(r.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?r.credentials="include":c.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(c){if(c.ep)return;c.ep=!0;const r=u(c);fetch(c.href,r)}})();(()=>{const t=document.querySelector("#app"),s=document.createElement("style");s.textContent=`
  /* Contenedor principal */
h1,
h2 {
  text-align: center;
  color: #2e7d32;
}

.upload-products-container,
.add-product-container,
.update-product-container,
.delete-product-container,
.search-by-id-container {
  background: rgb(51, 46, 46);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 90%;
  max-width: 500px;
}

/* Botones */
button {
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease-in-out;
}

button:hover {
  background-color: #1b5e20;
}

/* Inputs */
input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Lista de productos */
.container-products-ul {
  margin-top: 10px;
  list-style: none;
  padding: 0;
}

.container-products-ul li,
.search-by-id-container p {
  background: #e8f5e9;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  font-size: 16px;
}
  `,t.innerHTML=`
   <h1>Productos</h1>
    <!-- Cargar producto -->
    <div class="upload-products-container">
      <button class="upload-products">Cargar productos</button>
      <ul class="container-products-ul"></ul>
    </div>
    <!-- agregar producto -->
    <h2>Agregar productos</h2>
    <div class="add-product-container">
      <input
        class="add-product-name"
        type="text"
        placeholder="Nombre del producto"
      />
      <input class="add-product-price" type="text" placeholder="Precio" />
      <button class="add-product-btn">Agregar</button>
    </div>
    <!-- Actualizar producto -->
    <h2>Actualizar productos</h2>
    <div class="update-product-container">
      <input class="update-product-id" type="text" placeholder="Id" />
      <input
        class="update-product-name"
        type="text"
        placeholder="Nombre del producto"
      />
      <input class="update-product-price" type="text" placeholder="Precio" />
      <button class="update-product-btn">Actualizar</button>
    </div>
    <!-- Buscar producto por Id -->
    <h2>Buscar 1 producto por su Id</h2>
    <div class="search-by-id-container">
      <input
        class="search-by-id"
        type="text"
        placeholder="Ingrese el Id del producto que busca"
      />
      <div class="container-products-search"></div>

      <button class="search-product-btn">Buscar</button>
    </div>
    <!-- Eliminar producto -->
    <h2>Eliminar productos</h2>
    <div class="delete-product-container">
      <input
        class="delete-product-id"
        type="text"
        placeholder="Ingrese el Id del producto a eliminar"
      />
      <button class="delete-product-btn">Eliminar</button>
    </div>
  `,t.appendChild(s);const u="https://firestore-crud-5gtm.onrender.com/products";async function i(){const n=await fetch(u);console.log(n);const o=await n.json(),a=t.querySelector(".container-products-ul");a.innerHTML="",o.forEach(e=>{const d=document.createElement("li");d.textContent=`Id: ${e.id}, Nombre: ${e.name}, Precio: ${e.price}`,a.appendChild(d)})}t.querySelector(".upload-products").addEventListener("click",async()=>{i()});function r(n,o="success",a=".add-product-container"){const e=document.createElement("div");e.textContent=n,e.style.padding="10px",e.style.marginTop="10px",e.style.borderRadius="5px",e.style.fontWeight="bold",o==="success"?(e.style.backgroundColor="#DFFFD6",e.style.color="#2E7D32",e.style.border="1px solid #2E7D32"):o==="error"&&(e.style.backgroundColor="#FFDADA",e.style.color="#C62828",e.style.border="1px solid #C62828");const d=document.querySelector(a),p=d.querySelector(".message");p&&p.remove(),e.classList.add("message"),d.appendChild(e),setTimeout(()=>{e.remove()},3e3)}async function l(){let o=t.querySelector(".add-product-name").value.trim();const e=t.querySelector(".add-product-price").value.trim();if(!o||!e){r("Debes ingresar nombre y precio","error",".add-product-container");return}try{const d=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:o,price:e})});if(!d.ok)throw new Error("Error al agregar el producto");const p=await d.json();r(`Producto agregado con éxito Nombre: ${JSON.stringify(p.name)}, Precio: ${JSON.stringify(p.price)}`,"success"),i()}catch{r("No se pudo agregar el producto. ","error",".add-product-container")}t.querySelector(".add-product-name").value="",t.querySelector(".add-product-price").value=""}t.querySelector(".add-product-btn").addEventListener("click",async()=>{l()});async function y(){const n=t.querySelector(".update-product-id").value,o=t.querySelector(".update-product-name").value,a=t.querySelector(".update-product-price").value;if(!n.trim()){r("Debes ingresar un ID válido.","error",".update-product-container");return}try{const e={};if(o.trim()&&(e.name=o),a.trim()&&(e.price=a),!(await fetch(`${u}/${n}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw new Error("Error al actualizar el producto");r("Producto actualizado correctamente.","success",".update-product-container"),setTimeout(i,500),document.querySelector(".update-product-id").value="",document.querySelector(".update-product-name").value="",document.querySelector(".update-product-price").value=""}catch(e){console.error("Error al actualizar producto:",e),r("No se pudo actualizar el producto. Ingrese un Id valido","error",".update-product-container")}}document.querySelector(".update-product-btn").addEventListener("click",async()=>{y()});async function m(){const n=t.querySelector(".search-by-id").value.trim();if(!n){r("Debes ingresar un ID válido.","error",".search-by-id-container");return}try{const o=await fetch(`${u}/${n}`,{method:"GET"}),a=await o.json();if(!o.ok)throw new Error("Producto no encontrado");const e=t.querySelector(".container-products-search");e.innerHTML="";const d=document.createElement("p");d.textContent=`Nombre: ${a.name}, Price: ${a.price}`,e.appendChild(d),r("Producto encontrado con éxito.","success",".search-by-id-container")}catch(o){console.error("Producto no encontrado:",o),r("No se pudo encontrar el producto.","error",".search-by-id-container")}}t.querySelector(".search-product-btn").addEventListener("click",async()=>{m()});async function h(){const n=t.querySelector(".delete-product-id").value.trim();if(!n){r("Debes ingresar un ID válido.","error",".delete-product-container");return}try{if(!(await fetch(`${u}/${n}`,{method:"DELETE"})).ok)throw new Error("Error al eliminar el producto.");r("Producto eliminado correctamente.","success",".delete-product-container"),i(),t.querySelector(".delete-product-id").value=""}catch(o){console.error("Error al eliminar producto:",o),r("No se pudo eliminar el producto.","error",".delete-product-container")}}t.querySelector(".delete-product-btn").addEventListener("click",async()=>{h()})})();
