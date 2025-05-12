const root = document.getElementById("root");

title();
headerNav();
mainContent();
renderHome();

function title(){
    const h1= document.createElement('h1');
    h1.textContent= "El Tintero - Instituto de Apoyo Escolar";
    h1.classList.add('main-title');
    root.appendChild(h1);
}

function headerNav(){
    const header= document.createElement("header");
    header.classList.add("header");
    root.appendChild(header);

    const nav= document.createElement("nav");
    nav.classList.add("nav");
    header.appendChild(nav);

    const sections= [
        {name: "Inicio", render: renderHome},
        {name: "Servicios", render: renderServicios},
        {name: "Nosotros", render: renderNosotros},
        {name: "Contacto", render: renderContacto}
    ];

    sections.forEach(section => {
        const navElement = createNavElement (section.name);
        nav.appendChild(navElement);
        navElement.addEventListener("click", ()=> {
            section.render();
            window.scrollTo({top: 0, behavior: 'smooth' });
        });
    });
} 

function createNavElement(text){
    const element= document.createElement("div");
    element.innerText= text;
    element.classList.add("buttonNav");
    return element;
}

function mainContent(){
    let mainElement= document.querySelector('main');
    if (!mainElement){
        mainElement= document.createElement('main');
        mainElement.classList.add('main');
        root.appendChild(mainElement);
    }
    return mainElement;
}

// cada seccion

function renderHome(){
    const main= mainContent();
    main.innerHTML= "";

    const img= document.createElement('img');
    img.src= "imagenes/tinteroReversionado.jpg";
    img.alt= "Imagen del Tintero";
    img.classList.add('imagen-principal');
    main.appendChild(img);

    const h2= document.createElement('h2');
    h2.textContent= "El Tintero";
    main.appendChild(h2);

    const p= document.createElement('p');
    p.textContent= "Apoyo escolar para potenciar el aprendizaje de niños y adolescentes. Un espacio donde aprender es divertido."
    main.appendChild(p);
}

function renderServicios(){
    const main= mainContent();
    main.innerHTML= "";

    const h2= document.createElement('h2');
    h2.textContent= "Servicios";
    main.appendChild(h2);

    const ul= document.createElement('ul');
    const servicios= [
        "Clases de apoyo escolar en todas las materias",
        "Talleres de técnicas de estudio",
        "Preparacion para exámenes y trabajos prácticos"
    ];

    servicios.forEach(servicio => {
        const li= document.createElement('li');
        li.textContent= servicio;
        ul.appendChild(li);
    });
    main.appendChild(ul);
}

function renderNosotros() {
    const main = mainContent();
    main.innerHTML = "";
  
    const h2 = document.createElement('h2');
    h2.textContent = "Sobre nosotros";
    main.appendChild(h2);
  
    const p = document.createElement('p');
    p.textContent = "En El Tintero contamos con un equipo de docentes apasionados por la educación, comprometidos en acompañar a cada estudiante en su camino académico.";
    main.appendChild(p);
  }
  
  function renderContacto() {
    const main = mainContent();
    main.innerHTML = "";
  
    const h2 = document.createElement('h2');
    h2.textContent = "Contacto";
    main.appendChild(h2);
  
    const form = document.createElement('form');
    form.id = "form-contacto";
  
    // Nombre
    const labelNombre = document.createElement('label');
    labelNombre.setAttribute('for', 'nombre');
    labelNombre.textContent = "Nombre:";
    form.appendChild(labelNombre);
  
    const inputNombre = document.createElement('input');
    inputNombre.type = "text";
    inputNombre.id = "nombre";
    inputNombre.name = "nombre";
    inputNombre.required = true;
    form.appendChild(inputNombre);
  
    // Email
    const labelEmail = document.createElement('label');
    labelEmail.setAttribute('for', 'email');
    labelEmail.textContent = "Email:";
    form.appendChild(labelEmail);
  
    const inputEmail = document.createElement('input');
    inputEmail.type = "email";
    inputEmail.id = "email";
    inputEmail.name = "email";
    inputEmail.required = true;
    form.appendChild(inputEmail);
  
    // Mensaje
    const labelMensaje = document.createElement('label');
    labelMensaje.setAttribute('for', 'mensaje');
    labelMensaje.textContent = "Mensaje:";
    form.appendChild(labelMensaje);
  
    const textareaMensaje = document.createElement('textarea');
    textareaMensaje.id = "mensaje";
    textareaMensaje.name = "mensaje";
    textareaMensaje.required = true;
    form.appendChild(textareaMensaje);
  
    // Botón enviar
    const btnEnviar = document.createElement('button');
    btnEnviar.type = "submit";
    btnEnviar.textContent = "Enviar";
    form.appendChild(btnEnviar);
  
    main.appendChild(form);
  
    // Redes sociales
    const redesDiv = document.createElement('div');
    redesDiv.classList.add('redes-sociales');
  
    const fbLink = document.createElement('a');
    fbLink.href = "https://www.facebook.com/el.tintero.9";
    fbLink.target = "_blank";
    fbLink.setAttribute('aria-label', 'Facebook');
  
    const fbIcon = document.createElement('img');
    fbIcon.src = "imagenes/fb_bimi_logo.svg"; 
    fbIcon.alt = "Facebook";
    fbIcon.style.width = "32px";
    fbIcon.style.height = "32px";
  
    fbLink.appendChild(fbIcon);
    redesDiv.appendChild(fbLink);
  
    main.appendChild(redesDiv);
  

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias por contactarte! Pronto responderemos tu mensaje.');
      form.reset();
    });
  }