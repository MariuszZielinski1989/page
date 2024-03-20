const alfabetPolski = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J',
'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T',
'U', 'W', 'Y', 'Z', 'Ź', 'Ż'];

const hasla = [
  "Apetyt rośnie w miarę jedzenia.",
  "Bez pracy nie ma kołaczy.",
  "Biednemu zawsze wiatr w oczy.",
  "Czym skorupka za młodu, tym obiadu na starość.",
  "Dzieci i ryby głosu nie mają.",
  "Grosz do grosza, a będzie kasa.",
  "Jak sobie pościelesz, tak się wyśpisz.",
  "Kto pyta, nie błądzi.",
  "Lepszy wróbel w garści niż gołąb na dachu.",
  "Małe jest piękne.",
  "Nie od razu Kraków zbudowano.",
  "Ostrożność jest matką mądrości.",
  "Pieniądz robi pieniądz.",
  "Powtórzenie jest matką nauki.",
  "Sam nie zjesz, sam nie urośniesz.",
  "Śmiech to zdrowie.",
  "W zdrowym ciele, zdrowy duch.",
  "Ziarnko do ziarnka, a zbierze się miarka.",
  "Złota rączka.",
  "Złoty środek.",
  "Znajomość języków obcych to skarb.",
  "Zdrowy jak ryba.",
  "Zdrowy tryb życia.",
  "Zdrowie to największy skarb.",
  "Wesoły wieczór, smutny ranek.",
  "Trudne dziecko, długie życie.",
  "Szczęśliwy traf.",
  "Spróbować nie zaszkodzi.",
  "Słowo się rzekło, kobyłka u płotu.",
  "Sukces ma wielu ojców, porażka jest sierotą.",
  "Stara miłość nie rdzewieje.",
  "Siła w spokoju.",
  "Reklama dźwignią handlu.",
  "Prawda w oczy kole.",
  "Pracowity jak pszczoła.",
  "Pieniądze szczęścia nie dają.",
  "Niedaleko pada jabłko od jabłoni.",
  "Mowa jest srebrem, a milczenie złotem.",
  "Mądry Polak po szkodzie.",
  "Łaska pańska na pstrym koniu jeździ.",
  "Lepszy rydz niż nic.",
  "Lepszy sąsiad niż brat daleko mieszka.",
  "Kto rano wstaje, temu Pan Bóg daje.",
  "Kto nie ma w głowie, ten ma w nogach.",
  "Kto pyta, nie błądzi.",
  "Kto rano wstaje, temu Pan Bóg daje.",
  "Kto nie pracuje, ten nie je.",
  "Kto się spieszy, ten się mąci.",
  "Kto nie ma czasu, ten niech czyta dwa razy."
];

let hasla2=hasla.map(haslo => haslo.toUpperCase());
const randomNumber = Math.floor(Math.random() * 50) + 1;

let password=hasla2[randomNumber];

let password2='';

let movements = 0;
let chance = 8;

function winOrNot(yes)
{
  document.querySelector('.game__tools').style.display='none';
  document.querySelector('.game__image').style.display='none';
  document.querySelector('.game__sentence').style.display='none';
  const wornot = document.querySelector('.game__winOrGameOver');
  const swornot = document.querySelector('#winornot');

  wornot.style.display='Flex'; 
  if (yes)
  {
    swornot.innerHTML='<span>WYGRANA!</span><br><br><span>Wykonałeś '+movements+' ruchów</span><br><br><span>Miałeś '+(8-chance)+' błędów</span>';
    wornot.style.background='Green'; 
  }
  else
  {
    swornot.innerHTML='PRZEGRANA!';
    wornot.style.background='RED'; 
  }
return            
}


function clickLetter(){
  let el=this.parentNode;
  let  display = document.querySelector('.game__image');

  if (el) {
    const parent_element = document.getElementById(el.id);

    if (parent_element.classList.value==='litera'){

      let l=el.innerHTML;
      const response = chceckLetter(password,password2,parent_element.id)
      password2=response.psw;
      const isOK=response.ok
      changeStyle(parent_element.id,isOK);
      document.querySelector('.password').innerHTML=password2;
      
      if (password===password2)
      {
        winOrNot(1);
      }

      if (isOK)
      {
        movements++;
      }
      else
      {
        movements++;
        chance--;
      }

      if (chance===0)
      {
        winOrNot(0);
      }
      else
      {
        display.innerHTML='<span>Ruchy: '+movements+'</span>';
      }
    
    }
  }
}




function changeStyle(el,isOK)
{
  const d= document.getElementById(el)
  if (isOK)
  {
    d.classList.add('litera__ok')
    d.classList.remove('litera')
  }
  else
  {
    d.classList.add('litera__error')
    d.classList.remove('litera')
  }
}


function passwordBlank(pass)
{
  let password_blank='';
  pass.split('').forEach(litera => {
    if (litera === ' ')
    {
      password_blank+=litera;
    }
    else
    {
      if(litera===',' || litera==='.')
      {
        password_blank+=litera; 
      }
      else
      {
      password_blank+='_';
      }
    } 
  })
  return password_blank;
}


function chceckLetter(pass, pass2, letter)
{
  isOK=false;
  pass2=pass2.split('');
  pass.split('').forEach((litera, id) => {
    if (litera === letter)
    {
      pass2[id]=litera;
      isOK=true;
    }
  })
  pass2=pass2.join('');
  return {psw: pass2 , ok: isOK};
}


let b='';
alfabetPolski.forEach(element => {
  b+='<div class="litera" id="'+element+'"><span class="lit">'+element+'</span></div>'
});

document.querySelector('.game__tools').innerHTML=b;
const literki = document.querySelectorAll('.lit');
literki.forEach((litera)=>{
litera.addEventListener('click',clickLetter);
});

password2=passwordBlank(password);
document.querySelector('.password').innerHTML=password2;
document.querySelector('.game__image').innerHTML='<span>Ruchy: '+movements+'</span>';
