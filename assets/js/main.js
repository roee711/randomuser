
//load event page
document.addEventListener("DOMContentLoaded", function() {
    const newUser =  document.getElementById('new-user');

    newUser.addEventListener('click',function (){
        const card =  document.querySelector('.card');
        card.style.display ='none'
        newUser.style.display ='none'
        displayLoader();
        fetchRandomUser()
    })
    fetchRandomUser();
});
// display Loader
function  displayLoader(){
    const loader =  document.querySelector('.loader');
    if(loader.style.display=='block'|| loader.style.display==''){
        loader.style.display ='none'
    }else{
        loader.style.display ='block'
    }
}
//  remove class user info
function removeClassList() {
    const userInfo = document.querySelectorAll('.user-info li');
    userInfo.forEach(function(item) {
        item.classList.remove('active');
    });
}
//display header info user
function  setDetail(self){
    const userLabel =  document.querySelector('.user-label');
    const userValue =  document.querySelector('.user-value');
    const labelDetail =self.getAttribute('data-title')
    const valueDetail =self.getAttribute('data-value')
    userLabel.innerHTML=labelDetail;
    userValue.innerHTML=valueDetail;
}
// fetch api
async function fetchRandomUser() {
    try {

        const response = await fetch("https://randomuser.me/api/");
        const result = await response.json();

        if(result.results.length) {
            const card =  document.querySelector('.card');
            const newuUser =  document.getElementById('new-user');
            const arrUser = result.results[0];
            let birthday = arrUser.dob.date.split("T")[0]
            const html = ` <div class="row user-row-photo">
                <div class="user-photo"><img src="${arrUser.picture.thumbnail}"></div>
            </div>
            <div class="row user-row-name">
                <p class="user-label">Hi, My name is</p>
                <p class="user-value">${arrUser.name.title + ', ' + arrUser.name.first + ' ' + arrUser.name.last}</p>
            </div>
            <div class="row user-row-info">
                <ul class="user-info">
                    <li  data-title="Hi, My name is"         data-info="name"     data-value="${arrUser.name.title + ', ' + arrUser.name.first + ' ' + arrUser.name.last}" class="active user-name"></li>
                    <li data-title="My email address is"    data-info="email"     data-value="${arrUser.email}" class="user-email"></li>
                    <li data-title="My address is"          data-info="location"  data-value="${arrUser.location.street.number + ', ' + arrUser.location.street.name}"  class="user-location"></li>
                    <li data-title="My birthday is"         data-info="birthday"  data-value="${birthday}" class="user-birthday"></li>
                    <li data-title="My phone number is"     data-info="phone"     data-value="${arrUser.cell}" class="user-phone"></li>
                    <li data-title="Password and username"  data-info="pass"      data-value="${'username: ' + arrUser.login.username + ', password: ' + arrUser.login.password}" class="user-pass"></li>
                </ul>
            </div>`
            card.innerHTML =html
            createEventDetailUser();
            displayLoader();
            card.style.display ='block'
            newuUser.style.display ='block'
        }

    } catch (error) {
        console.error("Error:", error);
    }
}
// create event detail user
function createEventDetailUser(){
    const userInfo = document.querySelectorAll('.user-info li');

    userInfo.forEach(function(item) {

        item.addEventListener('mouseenter', function() {
            removeClassList();
            setDetail(this);
            this.classList.add('active');
        });

        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });


}
