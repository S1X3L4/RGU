function handleClick() {
    let salary = document.getElementById('salary').value;
    let days = document.getElementById('days').value;
    let url = "/api/getPrice?" + "salary=" + salary + "&days=" + days;
    console.log(url);
    
    fetch(url)
        .then(response => response.text())
        .then(finalPrice => {
            document.getElementById("finalPrice").innerHTML = "$" + finalPrice;
        })
        .catch(error => {
            document.getElementById("finalPrice").innerHTML = "Error: " + error;
            console.log("Error:", error);
        });
    return false;
}