const user = {
    "name": "Wasif Ali",
    "about": `
    Hi! I’m Wasif, a frontend web developer who loves creating clean, fast, and modern websites. I focus on building user-friendly designs, responsive layouts, and smooth web experiences using HTML, CSS, JavaScript, and Bootstrap.
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
