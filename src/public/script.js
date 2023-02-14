const socketClient = io();
const product = document.getElementById('newProduct');



socketClient.on('newProduct', newProduct => {
    const htmlRender = `<p>producto agregado id: ${newProduct.id}</p>`;
    product.innerHTML += htmlRender;
    console.log(newProduct);
});

socketClient.on('delProduct', (id) => {
    const htmlRender = `<p>producto eliminado id: ${id}</p>`;
    product.innerHTML += htmlRender;
    console.log(newProduct);
})