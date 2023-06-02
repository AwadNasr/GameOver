// ? =============> Global ===============>
const loading=document.querySelector('.loading')
// ! =============> When Start ===============>
getGames("mmorpg");
// * =============> Events ===============>
document.querySelector('.logout-btn').addEventListener('click',function(){
    localStorage.removeItem("uToken");
    location.href='./index.html';
})
//   <============= Navbar change active============>
document.querySelectorAll('.menu a').forEach((link)=>{
    link.addEventListener('click',function(e){
        document.querySelector('.menu .active').classList.remove('active');
        link.classList.add('active');
        let category=e.target.innerText;
        getGames(category);
    })
})
// ! =============> Functions ===============>
async function getGames(categoryName){
    loading.classList.remove('d-none')
    const options = {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': 'c6b4d1f386mshfc887de5aaf20f0p10d312jsn0c06ee2b20d6',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        },
     };
     const api=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`,options);
     const data =await api.json();
     displayData(data);
     loading.classList.add('d-none')
}

function displayData(datalist){
    let dataBox=``
    for(let i=0;i<datalist.length;i++){
        const vedioPath=datalist[i].thumbnail.replace("thumbnail.jpg", "videoplayback.webm");
        dataBox +=`
        <div class="col">
      <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" onclick="showDetails(${datalist[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${datalist[i].thumbnail}" />
             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src='${vedioPath}'>
              </video>
            </figure>
            <figcaption>
               <div class="hstack justify-content-between">
                  <h3 class="h6 small"> ${datalist[i].title} </h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>
               <p class="card-text small text-center opacity-50">
                  ${datalist[i].short_description}
               </p>
            </figcaption>
         </div>
         <footer class="card-footer small hstack justify-content-between">
            <span class="badge badge-color">${datalist[i].genre}</span>
            <span class="badge badge-color">${datalist[i].platform}</span>
         </footer>
      </div>
   </div>
        `
    }
    document.getElementById('gameData').innerHTML=dataBox
}
function startVideo(event){
    let video=event.target.querySelector('video')
    video.classList.remove('d-none')
    let playPromise = video.play();
    // video.play()
    if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Show playing UI.
          // We can now safely pause video...
          
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
}

function stopVideo(event){
    let video=event.target.querySelector('video')
    video.classList.add('d-none')
    // video.pause()
    var playPromise = video.pause();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
      // Show playing UI.
    })
    .catch(error => {
      // Auto-play was prevented
      // Show paused UI.
    });
  }
}

function showDetails(id){
    location.href=`./details.html?id=${id}`
}
