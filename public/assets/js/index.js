var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch("http://localhost:8080/api/v1/users", requestOptions)
    .then(response => response.text())
    .then((result)=>{console.log(result)
        let nose = document.getElementById("prueba")
        
        let objeto = JSON.parse(result)
        console.log(objeto)
        let html = ""
        objeto.msg.forEach(element => {
            html += `<div style="width: 300px; height: 300px; background:red; margin: 10px 10px 10px 10px">${element.nombre}</div>`
            nose.innerHTML=html
    });
    })
    .catch(error => console.log('error', error));