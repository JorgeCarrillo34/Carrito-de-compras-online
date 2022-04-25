var a = {};


//console.log(a);
const login = () =>{

    const login = document.getElementById('name');
    const login1 = document.getElementById('pass');

    a.name = login.value;
    a.password = login1.value;

    fetch("http://localhost:19991/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(a)
    }).then((response) => 
        {
            if(response.status == 200){
                window.alert("bienvenido al aplicativo usuario");
                window.location.href = '/paginas/inicio.html';
            }else if(response.status == 304){
                window.alert("bienvenido al aplicativo administrador");
                window.location.href = '/paginas/admin.html';
            }else{
                window.alert("contraseña o usuario erroneo")
            }
        }
    );
    
};

//export { a };
//module.exports = a;


