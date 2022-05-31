//                                                         async: executar funcoes assincronas     
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    //envia para a var input a informação digitada pelo usuário na hora da busca
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo()
        showMessage('Carregando...');

                                                            //função para transformar os caracteres especiais em códigos.
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=bd7dc9cd1d7bcd81b54cf8496f1a0672&units=metric&lang=pt_br`;
// await: fazer requisição, esperar resposta e após a resposta, armazenar na variavel
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                //abrir inspect > network > preview
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        }else{
            clearInfo()
            showMessage('Não encontramos esta localização.')
        }
    }
})

function showInfo(json) {
    showMessage('')
    //preencha as informações
    document.querySelector('.localTitulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)  
    document.querySelector('.ventoDirecao').style.transform = `rotate(${json.windAngle-90}deg)`
    //exibir as informações
    document.querySelector('.resultado').style.display = 'block'
}

//limpar as informações
function clearInfo() {
    showMessage('')
    document.querySelector('.resultado').style.display = 'none'
}

//mensagem de aviso
function showMessage(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}