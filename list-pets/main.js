

fetchQuestionsJSON()

async function fetchQuestionsJSON() {
  const response = await fetch('https://mobile-pet-api.herokuapp.com/pets');
  const questions = await response.json();
  return questions;
}
fetchQuestionsJSON().then(questions => {
  questions; // fetched questions
  dados = questions


  if (dados.length > 0){
    document.querySelector('.pets').innerHTML = ""
  }

  for (i = 1; i < dados.length; i++) {
    let div = document.createElement('div')
    div.classList.add('desc')
    let img = document.createElement('img')

    img.id = dados[i]['id']
    img.src = dados[i]['url']
    img.classList.add('img-pet')

    let id = dados[i]['id']
    img.onclick = function() { selectImage(id) };
    div.appendChild(img)


    let div2 = document.createElement('div')
    div2.classList.add('dc-pet')
    let span = document.createElement('span')
    span.classList.add('info-center')
    let name = document.createElement('h3')
    name.classList.add('name')
    name.textContent = dados[i]['name']

    let raca = document.createElement('p')
    let idade = document.createElement('p')
    raca.classList.add('info-pet')
    idade.classList.add('info-pet')

    raca.textContent = dados[i]['dogbreed']
    idade.textContent = dados[i]['age']


    span.appendChild(name)
    span.appendChild(raca)
    span.appendChild(idade)
    div2.appendChild(span)
    div.appendChild(div2)


    document.querySelector('.pets').appendChild(div)
   
  }


});
  
document.querySelector('.new-pet').addEventListener('click', () =>{
  window.location.href = '../register-pet/index.html' , target='_self'
})


function selectImage(id) {

 alert(id)
 window.location.href = '../service-pet/index.html?id='+id , target='_self'
}





