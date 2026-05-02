
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

    fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            result.innerText = 'Error: ' + data.error;
            result.style.color = 'yellow';
            return;
        }

        if (data.prediction === 'bad') {
            result.innerText = '❌ ' + data.message;
            result.style.color = 'red';
        } else if (data.prediction === 'good') {
            result.innerText = '✅ ' + data.message + ' Opening...';
            result.style.color = 'lightgreen';
            window.open(url, '_blank');
        } else {
            result.innerText = data.message || 'Unknown result';
            result.style.color = 'white';
        }
    })
    .catch(err => {
        result.innerText = 'Request failed';
        result.style.color = 'yellow';
        console.error(err);
    });
});


document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        button.click();
    }
});
