var a = {};

const insertarData = () => {

    const login = document.getElementById('name');
    const login1 = document.getElementById('pass');
    const login2 = document.getElementById('num');
    const login3 = document.getElementById('corr');
    const login4 = document.getElementById('dir');
    const login5 = document.getElementById('rol');
    a.name = login.value
    a.password = login1.value
    a.numero = login2.value
    a.correo = login3.value
    a.direccion = login4.value
    a.rol = login5.value

    console.log(a);

    fetch("http://localhost:19991/register", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(a)
    }).then((response) => 
    {
        if(response.status == 200){
            window.alert("Registrado exitosamente");
            window.location.href = '/paginas/index.html';
        }else{
            window.alert("Ingreso mal");
        }
    }
);
  };