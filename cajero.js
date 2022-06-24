let cuentas = [
    { nombre: "Hiromi", saldo: 200, password: 'helloworld' },
    { nombre: "Luis", saldo: 290, password: 'l33t' },
    { nombre: "Carlos", saldo: 67, password: '123' }
  ];

let idCuentaGlobal, idOperacionGlobal;
let intentos = 1, acciones;
let repetir;

let cuenta;
let password;
let formLogin = document.querySelector('.principal-login');
let formMenu = document.querySelector('.principal-menu');
formMenu.style.display = "none";
let formOperacion = document.querySelector('.principal-operacion');
formOperacion.style.display = "none";
let monto = document.querySelector('#cantidad');
let alerta = document.querySelector('#msj-alerta-cont');
alerta.style.display = "none";



function main(){

    cuenta = document.querySelector('#user').value;
    password = document.querySelector('#pass').value;
    

    if(cuenta === 'Hiromi'){
        Login(0);
    }
    else if(cuenta === 'Luis'){
        Login(1);
    }
    else if(cuenta === 'Carlos'){
        Login(2);
    }
}

function Login(idCuentaSeleccionada){

    

    if(intentos === 3){
        alert('Cajero Bloqueado');
        formLogin.style.display = "none";
        alerta.style.display = 'none';
        return;
    }

    if(validarPass(cuenta , password , idCuentaSeleccionada)){
        intentos = 1;
        //Entra al menu
        let titulo = document.querySelector('#bienvenida');
        titulo.textContent = `Hola ${cuentas[idCuentaSeleccionada].nombre},\n¿Qué operación deseas realizar?`
        alerta.style.display = 'none';
        formLogin.style.display = "none";
        formMenu.style.display = "block"

        idCuentaGlobal = idCuentaSeleccionada;
    }
    else{
        
        alerta.style.display = 'block';
        alerta.textContent = `Inicio de sesión incorrecto, verifica tus datos.\nTe restan ${3 - intentos} intentos`;
        intentos++;
    }

}

function validarPass(user , pass , id){

    return (pass === cuentas[id].password && user === cuentas[id].nombre) ? true : false
}

function accion(idOperacion){

    if(idOperacion === 0){
        alerta.style.display = 'block';
        alerta.textContent = `Tu saldo es de: ${cuentas[idCuentaGlobal].saldo}`;
        return;
    }
    else if(idOperacion === 3){
        alerta.style.display = 'none';
        formLogin.style.display = "block";
        formMenu.style.display = "none";
        formOperacion.style.display = "none";
        cuenta = document.querySelector('#user');
        cuenta.value = '';
        password = document.querySelector('#pass');
        password.value = '';
        intentos = 1;
        return;
    }
    //Entrar seccion de operaciones
    idOperacionGlobal = idOperacion;
    alerta.style.display = 'none';
    formMenu.style.display = "none";
    monto.value = '';
    formOperacion.style.display = "block";
}

function validarLimite(){
    
    let nuevoMonto = monto.value
    let res;

    if(idOperacionGlobal === 1){
        res = cuentas[idCuentaGlobal].saldo + parseInt(nuevoMonto);
        if(res > 990){
            alerta.style.display = 'block';
            alerta.textContent = `Operacion denegada! Tu limite de saldo se excede.`;
        }
        else{
            
            alerta.style.display = 'block';
            alerta.textContent = `Operación exitosa! Tu nuevo saldo es de: ${res}`;
            formMenu.style.display = "block";
            formOperacion.style.display = "none";
            cuentas[idCuentaGlobal].saldo = res;
        }
    }
    else if(idOperacionGlobal === 2){
        res = cuentas[idCuentaGlobal].saldo - parseInt(nuevoMonto);
        if(res < 10){
            alerta.style.display = 'block';
            alerta.textContent = `Operacion denegada! Debes mantener un saldo minimo de $10`;
        }
        else{
            
            alerta.style.display = 'block';
            alerta.textContent = `Operación exitosa! Tu nuevo saldo es de: ${res}`;
            formMenu.style.display = "block";
            formOperacion.style.display = "none";
            cuentas[idCuentaGlobal].saldo = res
        }
    }
    else if(idOperacionGlobal === 4){
        if(monto !== '' || monto !== ' '){
            cuentas[idCuentaGlobal].password = monto.value;
            console.log(cuentas[idCuentaGlobal].password);
            alerta.style.display = 'block';
            alerta.textContent = `Contraseña actualizada!`;
            formMenu.style.display = "block";
            formOperacion.style.display = "none";
        }
        
    }

}

function quitar(){
    alerta.style.display = 'none';
}


