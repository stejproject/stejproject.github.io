const wrapper = document.querySelector(".main_wrapper"),
toast = wrapper.querySelector(".toast_cls"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

window.onload = ()=>{
    
    // start 
    function ajax(){
        $.ajax({
            url: "https://reqres.in/api/users",
            type: "post",
            success: function (response, textStatus, xhr) {
                if(xhr.status == 200 || xhr.status < 300) {
                    toast.classList.remove("offline");
                    title.innerText = "Kita Online(Daring)!";
                    subTitle.innerText = "Internet Telah Terhubung.";
                    wifiIcon.innerHTML = '<i class="fa fa-wifi"></i>';
                    closeIcon.onclick = ()=>{
                        wrapper.classList.add("hide");
                    }
                    setTimeout(()=>{
                        wrapper.classList.add("hide");
                    }, 5000);
                } else {
                    offline();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                offline();
            }
        });
    }
    // end 
    
    function offline() {
        wrapper.classList.remove("hide");
        toast.classList.add("offline");
        title.innerText = "Kita Offline(Luring)!";
        subTitle.innerText = "Maaf! Internet Belum Terhubung ya.";
        wifiIcon.innerHTML = '<i class="fa fa-times"></i>';
    }

    // this setInterval function call ajax after every 20000ms
    setInterval(()=>{
        ajax();
    }, 2000);
}