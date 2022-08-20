/*loading screen */
$(document).ready(function () {
  $(".spinner").fadeOut(1000, function () {
    $("#load").fadeOut(1000, function () {
      $("#load").remove();
    });
    $("body").css("overflow-y", "auto");
  });
});

/*start aside  */
$(".strip-toggle-meun").click(function () {
  if ($(".strip-header-nav").css("left") == "0px") {
    $(".strip-header-nav").css("left", "14.5rem");
    $(".nav-tab-meun").addClass("open-menu").removeClass("close-menu");
    $(".strip-toggle-meun").html(`<i class="fa-solid fa-xmark"></i>`);
    $(".nav-tab-meun .nav li")
      .eq(0)
      .animate({ paddingTop: "1.2rem", opacity: "1" }, 1100);
    $(".nav-tab-meun .nav li")
      .eq(1)
      .animate({ paddingTop: "1.2rem", opacity: "1" }, 1300);
    $(".nav-tab-meun .nav li")
      .eq(2)
      .animate({ paddingTop: "1.2rem", opacity: "1" }, 1600);
    $(".nav-tab-meun .nav li")
      .eq(3)
      .animate({ paddingTop: "1.2rem", opacity: "1" }, 1800);
    $(".nav-tab-meun .nav li")
      .eq(4)
      .animate({ paddingTop: "1.2rem", opacity: "1" }, 2000);
    $(".nav-tab-meun .nav li")
      .eq(5)
      .animate({ paddingTop: "1.2rem", opacity: "1" }, 2000);
    console.log("1");
  } else {
    $(".strip-header-nav").css("left", "0rem");
    $(".nav-tab-meun").addClass("close-menu").removeClass("open-menu");
    $(".strip-toggle-meun").html(`<i class="fa fa-align-justify"></i>`);
    $(".nav-tab-meun .nav li").animate(
      { opacity: "0", paddingTop: "40rem" },
      500
    );
    console.log("2");
  }
});
$(".nav-tab-meun .nav-link[href='#contact']").click(function () {
  let sectionOffset = $("#contact").offset().top;
  $("html , body").animate({ scrollTop: sectionOffset }, 1500);
});
/*end aside  */

/* start API */
let rowData = document.getElementById("rowData"),
  allMovies,
  navLinks = document.getElementsByClassName("nav-link"),
  result = document.getElementById("res"),
  allMoviesByWord = document.getElementById("allMovies"),
  searchURL = `https://api.themoviedb.org/3/search/movie?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US&page=1&include_adult=false`,
  trendingURL = `https://api.themoviedb.org/3/trending/all/day?api_key=dda1f2a5601a9d7073885852e6804574`,
  latestURL = `https://api.themoviedb.org/3/movie/latest?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US`,
  popularURL = `https://api.themoviedb.org/3/movie/latest?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US`,
  topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US&page=1`,
  upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US&page=1`,
  URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US&page=1`,
  searchBar = document.getElementById("word");



  allMoviesByWord.addEventListener('keyup',(e)=>{
    getMoviesBySearch(e.target.value)
  })


  async function getMoviesBySearch(q){
    let respons = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US&query=${q}&page=1&include_adult=false`
    );
    responsData = await respons.json();
    // allMovies = responsData.results;
    console.log(responsData.results);
    displayMovies(responsData.results);
  }


async function getmovies(category) {
  let respons = await fetch(
    `https://api.themoviedb.org/3/${category}?api_key=dda1f2a5601a9d7073885852e6804574&language=en-US`
  );
  responsData = await respons.json();
  allMovies = responsData.results;
  console.log(allMovies);
  displayMovies(allMovies);
}

getmovies("trending/all/day");

/*  Searc in bar  stay (Api)?????????????/  =>>>   stay search in keyword (Api) ?????????? */
async function getSearchBar(valueInput) {
  let respons = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=dda1f2a5601a9d7073885852e6804574&query=${valueInput}`
  );
  let responsData = await respons.json();
  allSearch = responsData.results;
  displayMovies(allSearch);
}
searchBar.addEventListener("keyup", function () {
  let currentSearch = searchBar.value;
  if (currentSearch == "") {
    result.innerHTML = "";
  } else {
    getSearchBar(currentSearch);
  }
});

// function displayMovies(showInElement) {
//   let temp = ``;
//   for (let i = 0; i < allMovies.length; i++) {
//     temp += `<div class="col-md-6 col-lg-4 shadow">
//         <div class="post position-relative rounded overflow-hidden">
//           <img src="https://image.tmdb.org/t/p/w500/${responsData.results[i].poster_path}" class="img-fluid rounded" alt="" srcset="">
//           <div class="layer d-flex flex-column justify-content-center position-absolute rounded">
//             <h2 class="mb-2">${responsData.results[i].original_title}</h2>
//             <p class="lead fw-light">${responsData.results[i].overview}</p>
//             <p>${responsData.results[i].first_air_date}</p>
//             <p>${responsData.results[i].vote_average}</p>
//           </div>
//         </div>
//         </div>`;
//   }
//   showInElement.innerHTML = temp;
// };

function displayMovies(movies) {
  let temp = ``;
  for (let i = 0; i < movies.length; i++) {
    temp += `<div class="col-md-6 col-lg-4 shadow">
        <div class="post position-relative rounded overflow-hidden">
          <img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" class="img-fluid rounded" alt="" srcset="">
          <div class="layer d-flex flex-column justify-content-center position-absolute rounded">
            <h2 class="mb-2">${movies[i].original_title||movies[i].original_name}</h2>
            <p class="lead fw-light">${movies[i].overview}</p>
            <p>${movies[i].first_air_date}</p>
            <p>${movies[i].vote_average}</p>
          </div>
        </div>
        </div>`;
  }
  document.getElementById('rowData').innerHTML = temp;
}

/* remainder click links turn APis  ????????????*/

/* end API */

/*start contact Us */

function userNameValid() {
  let regexName = /^[A-Za-z0-9]+$/;
  if (regexName.test($("#name").val()) == true && $("#name").val() != "") {
    $("#alertName").css("display", "none");
    return true;
  } else {
    $("#alertName").css("display", "block");
    return false;
  }
}
function userEmailValid() {
  let regexEmail = /^\w+@[A-Za-z_]+?\.[a-zA-Z]{2,3}$/;
  if (regexEmail.test($("#Email").val()) == true && $("#Email").val() != "") {
    $("#alertEmail").css("display", "none");
    return true;
  } else {
    $("#alertEmail").css("display", "block");
    return false;
  }
}
function userPhoneValid() {
  let regexPhone = /^(\+\d{1,3}[- ]?)?\d{11}$/;
  if (regexPhone.test($("#phone").val()) == true && $("#phone").val() != "") {
    $("#alertPhone").css("display", "none");
    return true;
  } else {
    $("#alertPhone").css("display", "block");
    return false;
  }
}
function userAgeValid() {
  let regexAge = /^(1[89]|[2-9]\d)$/;
  if (regexAge.test($("#age").val()) == true && $("#age").val() != "") {
    $("#alertAge").css("display", "none");
    return true;
  } else {
    $("#alertAge").css("display", "block");
    return false;
  }
}
function userPasswordValid() {
  let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (
    regexPassword.test($("#password").val()) == true &&
    $("#password").val() != ""
  ) {
    $("#alertPassword").css("display", "none");
    return true;
  } else {
    $("#alertPassword").css("display", "block");
    return false;
  }
}
function userRePasswordValid() {
  if ($("#password").val() == $("#repassword").val()) {
    $("#alertRepassword").css("display", "none");
    return true;
  } else {
    $("#alertRepassword").css("display", "block");
    return false;
  }
}

$("#name").keyup(userNameValid);
$("#Email").keyup(userEmailValid);
$("#phone").keyup(userPhoneValid);
$("#age").keyup(userAgeValid);
$("#password").keyup(userPasswordValid);
$("#repassword").keyup(userRePasswordValid);

$("#contact").click(function () {
  if (
    userNameValid() &&
    userEmailValid() &&
    userPhoneValid() &&
    userAgeValid() &&
    userPasswordValid() &&
    userRePasswordValid()
  ) {
    document.getElementById("submitBtn").disabled = true;
  } else {
    document.getElementById("submitBtn").disabled = false;
  }
});
/*end contact Us */


console.log([...navLinks][3].getAttribute('data'));

for(let i =0; i<navLinks.length;i++){
  navLinks[i].addEventListener('click',()=>{
    if(navLinks[i].getAttribute('data')!= undefined){
      getmovies(navLinks[i].getAttribute('data'))
    }
  })
}