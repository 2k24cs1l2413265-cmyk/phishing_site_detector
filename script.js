
function showPage(pageId){
    let pages = document.querySelectorAll(".page");
    pages.forEach(p => p.classList.remove("active"));

    document.getElementById(pageId).classList.add("active");
}


const button = document.getElementById("detectBtn");
const input = document.getElementById("search");
const result = document.getElementById("result");

button.addEventListener("click", function () {
    let url = input.value.trim();

    if (url === "") {
        result.innerText = "⚠️ Enter URL first";
        result.style.color = "yellow";
        return;
    }

    if (!url.startsWith("http")) {
        url = "https://" + url;
    }

    result.innerText = "⏳ Checking...";
    result.style.color = "white";

    setTimeout(() => {

        if (
            url.includes("@") ||
            url.includes("login") ||
            url.includes("verify") ||
            url.includes("update") ||
            url.length > 50
        ) {
            result.innerText = "❌ Phishing Website Blocked!";
            result.style.color = "red";
            window.open(url,"_blank");
        } else {
            result.innerText = "✅ Safe Website Opening...";
            result.style.color = "lightgreen";

            window.open(url, "_blank");
        }

    }, 1000);
});


document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});