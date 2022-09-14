const impressumDiv = document.getElementById("impressumDiv");
const hiddenDiv = document.getElementById("hiddenText");
const impressumBtn = document.getElementById("impressumBtn");
impressumBtn.onclick = function () {

    if (hiddenDiv.style.display === "none" || hiddenDiv.style.display === "") {
        hiddenDiv.style.display = "block"
        impressumDiv.setAttribute("style","padding-bottom: 0;")
    } else {
        hiddenDiv.style.display = "none";
        impressumDiv.setAttribute("style","padding-bottom: 20px;")
    }
};