let carrito= {};

const items =document.getElementById('figure');
const card= document.getElementById('items');
const footer= document.getElementById('footer');
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment =  document.createDocumentFragment();
var canti, titulo='', total;


document.addEventListener('DOMContentLoaded', () => {
    fetch('');
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintar();
    }
})

items.addEventListener('click',e =>{
    //console.log(e.target.id);
    addCarro(e,e.target.id);
})

card.addEventListener('click', e =>{
    btnAccion(e);
} )

const imagen = async () => {
  const request = await fetch(`http://localhost:19991/based`, {
    method: "get",
  });
  var name = await request.json();
  //console.log(name[0].foto);

  const fig = document.getElementById("figure");

  for (let i = 0; i < name.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", "dv" + i);
    div.setAttribute("display", "inline");
    div.setAttribute("class","div-ind");

    const img = document.createElement("img");
    img.setAttribute("id", i + 1);
    img.setAttribute("width", "250px");
    img.setAttribute("height", "250px");
    img.src = `data:image/png;base64,${name[i].foto}`;

    //const parcial1 = document.querySelector(".div-ind");
    const p1 = document.createElement("h1");
    const q=document.createElement("p");
    q.style.color = "black";
    q.textContent = `${name[i].precio}`;
    p1.style.color = "black";
    p1.textContent = `${name[i].nombre}`;
    

    const but = document.createElement("button");
    but.setAttribute("id", i);
    but.setAttribute("type", "button");
    but.setAttribute("class","bts");
    but.textContent = "comprar";

    fig.appendChild(div);
    div.appendChild(img);
    div.appendChild(but);
    div.appendChild(p1);
    div.appendChild(q);
   // console.log(parcial1);
  }

};

const addCarro = (e,id) =>{
    //console.log(e.target);
    
    if(e.target.classList.contains('bts')){
      setCarrito(e.target.parentElement,id)
    }
  //  console.log(e.target.classList.contains('btn').getAttribute(id));
    e.stopPropagation();
}

const setCarrito = (objeto,id) =>{
    //console.log(objeto.querySelector(id));
    const producto ={
       id: id,
       title:objeto.querySelector('h1').textContent,
       precio: objeto.querySelector('p').textContent,
       cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad+1;
        //producto.precio=(carrito[producto.id].precio) * producto.cantidad;
    }

    carrito[producto.id]= {...producto};
    pintar();

    // console.log(carrito);
    // canti += Number(carrito[producto.id].cantidad);
    // console.log(isNaN(canti));
    // titulo += carrito[producto.id].title + "  " + canti  + "  " + carrito[producto.id].precio + "\n" ;
    // console.log(titulo);
}

const pintar = () =>{
    var c =0; 
    card.innerHTML='';
    Object.values(carrito).forEach(producto =>{
        c++;
        templateCarrito.querySelector('th').textContent = c;
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent= producto.cantidad * producto.precio

        //canti =templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad;
        //titulo = templateCarrito.querySelectorAll('td')[0].textContent = producto.title;
        //console.log(canti);
        //console.log(titulo);
        
        const clone = templateCarrito.cloneNode(true);
        //console.log(clone.textContent);
        fragment.appendChild(clone)
    })
        card.appendChild(fragment)

        pintarFooter();

        localStorage.setItem('carrito',JSON.stringify(carrito));
        
}

const pintarFooter= () =>{
    footer.innerHTML='';
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc,{cantidad}) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc + cantidad * precio,0);

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById('vaciar-carrito');
    btnVaciar.addEventListener('click' , ()=>{
        carrito={};
        pintar();
    })


}

const btnAccion= e =>{
    console.log()
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = {...producto}
    pintar(); 
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        if(producto.cantidad === 0){
            delete carrito[e.target.dataset.id]
        }
        pintar();
    }
    e.stopPropagation();
}

const comprar = () =>{
   console.log(carrito);
   

     fetch(`http://localhost:19991/email`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify(carrito)
    }).then((response) => 
    {
        if(response.status == 200){
            window.alert("bienvenido al aplicativo")
            window.location.href = '/paginas/inicio.html'
        }else{
            window.alert("contraseña o usuario erroneo")
        }
    }
);
}