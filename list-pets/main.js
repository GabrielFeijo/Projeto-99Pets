

fetchQuestionsJSON()

async function fetchQuestionsJSON() {
    const response = await fetch('https://api-mobile-pets.herokuapp.com/pets');
    const questions = await response.json();
    return questions;
  }
  fetchQuestionsJSON().then(questions => {
    questions; // fetched questions
    dados = questions
    // console.log(dados[1]['url'])
    // document.querySelector('.alvimar').src = dados[1]['url'];

    for(i=1;i<dados.length;i++){
        let div = document.createElement('div')
        div.classList.add('desc')
        let img = document.createElement('img')
     
        img.src = dados[i]['url']
        img.classList.add('img-pet')
        div.appendChild(img)


        let div2 = document.createElement('div')
        div2.classList.add('dc-pet')
        let span =  document.createElement('span')
        span.classList.add('info-center')
        let name = document.createElement('h3')
        name.classList.add('name')
        name.textContent =  dados[i]['name']

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
  


  
  

  

  