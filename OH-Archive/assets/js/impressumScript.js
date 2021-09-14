const impressumDiv = document.getElementById("impressumDiv");
const hiddenDiv = document.getElementById("hiddenText");
const impressumBtn = document.getElementById("impressumBtn");
const closeBtn = document.getElementById("closeBtn")
impressumBtn.onclick = function () {
    if (impressumDiv.style.display !== "none") {
        impressumDiv.style.display = "none";
        hiddenDiv.style.display = "block"
    } else {
        impressumDiv.style.display = "block";
        hiddenDiv.style.display = "none";
    }
};
closeBtn.onclick = function () {
    if (hiddenDiv.style.display !== "none") {
        hiddenDiv.style.display = "none";
        impressumDiv.style.display = "block"
    } else {
        hiddenDiv.style.display = "block";
        impressumDiv.style.display = "none";
    }
};