const socketClient = io();
const product = document.getElementById('newProduct');



socketClient.on('newProduct', newProduct => {
    const htmlRender = `<p class="text-success">producto agregado id: ${newProduct._id}</p>`;
    product.innerHTML += htmlRender;
    console.log(newProduct);
});

socketClient.on('delProduct', (id) => {
    const htmlRender = `<p class="text-danger">producto eliminado id: ${id}</p>`;
    product.innerHTML += htmlRender;
    console.log(newProduct);
})