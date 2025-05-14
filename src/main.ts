import "./style.css";

(() => {
  const divEl = document.querySelector<HTMLDivElement>("#app")!;
  const styles = document.createElement("style");
  styles.textContent = `
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
  `;

  divEl.innerHTML = `
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
  `;
  divEl.appendChild(styles);

  const URl_API = "https://firestore-crud-5gtm.onrender.com/products";

  // function getProducts
  async function getProducts() {
    const res = await fetch(URl_API);
    console.log(res);
    const products = await res.json();

    const listProductUl: HTMLElement = divEl.querySelector(
      ".container-products-ul"
    )!;
    listProductUl.innerHTML = "";
    // console.log("Datos recibidos:", products);

    products.forEach((p: any) => {
      // console.log(p.product);
      // console.log(p.product.id);
      const liProduct = document.createElement("li")!;
      liProduct.textContent = `Id: ${p.id}, Nombre: ${p.name}, Precio: ${p.price}`;
      listProductUl.appendChild(liProduct);
    });
  }

  //Cargar productos
  const btnLoadProducts = divEl.querySelector(".upload-products")!;
  btnLoadProducts.addEventListener("click", async () => {
    getProducts();
  });

  // --------------------------------

  // ------------------------
  //showmessage
  function showMessage(
    message: string,
    type = "success",
    containerSelector = ".add-product-container"
  ) {
    const messageContainer = document.createElement("div");
    messageContainer.textContent = message;

    // Estilos del mensaje
    messageContainer.style.padding = "10px";
    messageContainer.style.marginTop = "10px";
    messageContainer.style.borderRadius = "5px";
    messageContainer.style.fontWeight = "bold";

    // Definir colores según el tipo de mensaje
    if (type === "success") {
      messageContainer.style.backgroundColor = "#DFFFD6"; // Verde claro
      messageContainer.style.color = "#2E7D32"; // Verde oscuro
      messageContainer.style.border = "1px solid #2E7D32";
    } else if (type === "error") {
      messageContainer.style.backgroundColor = "#FFDADA"; // Rojo claro
      messageContainer.style.color = "#C62828"; // Rojo oscuro
      messageContainer.style.border = "1px solid #C62828";
    }

    // Seleccionar el contenedor correcto donde se mostrará el mensaje
    const targetContainer = document.querySelector(containerSelector)!;

    // Remover mensajes previos
    const oldMessage = targetContainer!.querySelector(".message");
    if (oldMessage) {
      oldMessage.remove();
    }

    messageContainer.classList.add("message");
    targetContainer.appendChild(messageContainer);

    // Remover el mensaje después de unos segundos
    setTimeout(() => {
      messageContainer.remove();
    }, 3000);
  }
  //-------------------------------------
  function generateUniqueId() {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
  // Function addProduct
  async function addProduct() {
    let inputName: HTMLInputElement = divEl.querySelector(".add-product-name")!;
    let inputNaValue = inputName.value.trim();
    const inputPrice: HTMLInputElement =
      divEl.querySelector(".add-product-price")!;
    const inputPriceValue = inputPrice.value.trim();

    // Validar que los campos no estén vacíos
    if (!inputNaValue || !inputPriceValue) {
      showMessage(
        "Debes ingresar nombre y precio",
        "error",
        ".add-product-container"
      );
      return;
    }

    try {
      const res = await fetch(URl_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // id: generateUniqueId(),
          name: inputNaValue,
          price: inputPriceValue,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el producto");
      }

      const data = await res.json();
      showMessage(
        `Producto agregado con éxito Nombre: ${JSON.stringify(
          data.name
        )}, Precio: ${JSON.stringify(data.price)}`,
        "success"
      );
      //   alert(`Producto agregado ${JSON.stringify(data)}`);
      getProducts();
    } catch (error) {
      showMessage(
        "No se pudo agregar el producto. ",
        "error",
        ".add-product-container"
      );
    }
    (divEl.querySelector(".add-product-name") as HTMLInputElement).value = "";
    (divEl.querySelector(".add-product-price") as HTMLInputElement).value = "";
  }

  const btnAdd = divEl.querySelector(".add-product-btn")!;
  btnAdd.addEventListener("click", async () => {
    addProduct();
  });
  //-----------------------------------------
  // Actualizar el producto
  async function uploadProduct() {
    const idProduct = (
      divEl.querySelector(".update-product-id") as HTMLInputElement
    ).value;
    const nameProduct = (
      divEl.querySelector(".update-product-name") as HTMLInputElement
    ).value;
    const priceProduct = (
      divEl.querySelector(".update-product-price") as HTMLInputElement
    ).value;

    if (!idProduct.trim()) {
      showMessage(
        "Debes ingresar un ID válido.",
        "error",
        ".update-product-container"
      );
      return;
    }

    try {
      const productData: { name?: string; price?: string } = {};
      if (nameProduct.trim()) productData.name = nameProduct;
      if (priceProduct.trim()) productData.price = priceProduct;

      const res = await fetch(`${URl_API}/${idProduct}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el producto");
      }

      showMessage(
        "Producto actualizado correctamente.",
        "success",
        ".update-product-container"
      );
      // Cargar los productos actualizados en la interfaz
      setTimeout(getProducts, 500);
      //limpiar los campos de entrada
      (document.querySelector(".update-product-id") as HTMLInputElement).value =
        "";
      (
        document.querySelector(".update-product-name") as HTMLInputElement
      ).value = "";
      (
        document.querySelector(".update-product-price") as HTMLInputElement
      ).value = "";
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      showMessage(
        "No se pudo actualizar el producto. Ingrese un Id valido",
        "error",
        ".update-product-container"
      );
    }
  }
  const btnUploadProduct = document.querySelector(".update-product-btn")!;
  btnUploadProduct.addEventListener("click", async () => {
    uploadProduct();
  });
  //---------------------------
  async function searchById() {
    const idProduct = (
      divEl.querySelector(".search-by-id") as HTMLInputElement
    ).value.trim();

    if (!idProduct) {
      showMessage(
        "Debes ingresar un ID válido.",
        "error",
        ".search-by-id-container"
      );
      return;
    }
    try {
      const res = await fetch(`${URl_API}/${idProduct}`, {
        method: "GET",
      });
      const product = await res.json();
      if (!res.ok) {
        throw new Error("Producto no encontrado");
      }
      const containerParagraph = divEl.querySelector(
        ".container-products-search"
      )!;
      containerParagraph.innerHTML = "";
      const searchParagraph = document.createElement("p");
      searchParagraph.textContent = `Nombre: ${product.name}, Price: ${product.price}`;
      containerParagraph.appendChild(searchParagraph);

      showMessage(
        "Producto encontrado con éxito.",
        "success",
        ".search-by-id-container"
      );
    } catch (error) {
      console.error("Producto no encontrado:", error);
      showMessage(
        "No se pudo encontrar el producto.",
        "error",
        ".search-by-id-container"
      );
    }
  }
  const btnSearch = divEl.querySelector(".search-product-btn")!;
  btnSearch.addEventListener("click", async () => {
    searchById();
  });

  //---------------------------
  //Funcion de Delete
  async function deleteProduct() {
    const idProduct = (
      divEl.querySelector(".delete-product-id") as HTMLInputElement
    ).value.trim();

    // Validar que el ID no esté vacío
    if (!idProduct) {
      showMessage(
        "Debes ingresar un ID válido.",
        "error",
        ".delete-product-container"
      );
      return;
    }

    try {
      const res = await fetch(`${URl_API}/${idProduct}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el producto.");
      }

      showMessage(
        "Producto eliminado correctamente.",
        "success",
        ".delete-product-container"
      );

      // Recargar la lista de productos para reflejar el cambio
      getProducts();

      // Limpiar el campo de entrada
      (divEl.querySelector(".delete-product-id") as HTMLInputElement).value =
        "";
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      showMessage(
        "No se pudo eliminar el producto.",
        "error",
        ".delete-product-container"
      );
    }
  }

  const btnDeleteProduct = divEl.querySelector(".delete-product-btn")!;
  btnDeleteProduct.addEventListener("click", async () => {
    deleteProduct();
  });
})();
