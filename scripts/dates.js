// Display the current year
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Display the last modified date
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;