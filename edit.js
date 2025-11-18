const user = {
    "name": "Wasif Ali",
    "about": `
    Hello I am Wasif a Frontend Web Developer with over 5 years of experience creating engaging 
        and responsive web experiences. Specialized in building modern web applications 
        using the latest technologies and best practices.
    `,
    "email":"mailprofilioo@gmial.com",
    "phone":"+92 3290487854",
    "address":"Pakistan , Lahore",


}
document.addEventListener("DOMContentLoaded",()=>{
    const name = document.querySelectorAll(".user-name");
    name.forEach((e)=>{
        e.innerHTML = user.name; 
    })
    document.querySelector(".user-about").innerHTML = user.about;
    document.querySelector(".user-address").innerHTML = user.address;
    document.querySelector(".user-phone").innerHTML = user.phone;
    document.querySelector(".user-email").innerHTML = user.email;
})