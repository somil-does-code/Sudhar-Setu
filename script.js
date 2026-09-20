document.addEventListener("DOMContentLoaded", () => {
    // Carousel Images
    const images = [
        "https://i.postimg.cc/0jxFbrSp/BANGALORE-super-Jumbo.jpg",
        "https://i.postimg.cc/nrNN1T9t/Garbage-Street-East-Delhi-5.webp",
        "https://i.postimg.cc/8553QxhS/plastic-pollution-india.jpg",
        "https://i.postimg.cc/5tfTpXyj/SANITATION-super-Jumbo.webp",
        "https://i.postimg.cc/G25fczQs/Screenshot-2024-11-09-175750.png",
        "https://i.postimg.cc/gjLTrRSt/Screenshot-2024-11-09-180216.png" 
    ]; 
    let currentImageIndex = 0; 
 
    // Handle image carousel 
    function changeImage() { 
        const carouselImage = document.getElementById("carousel-image"); 
        if (carouselImage) { 
            carouselImage.src = images[currentImageIndex]; 
            currentImageIndex = (currentImageIndex + 1) % images.length; 
        } 
    } 
    setInterval(changeImage, 3000); 
 
    // Check if the user is logged in 
    const username = localStorage.getItem("username"); 
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []; 
 
    if (username) { 
        // Show the greeting and submission form for logged-in users 
        const userGreeting = document.getElementById("user-greeting"); 
        userGreeting.textContent = `Hello, ${username}!`; 
        document.getElementById("submit-issue").style.display = "block"; 
        document.getElementById("login-message").style.display = "none"; 
    } else { 
        document.getElementById("login-message").style.display = "block"; 
        document.getElementById("submit-issue").style.display = "none"; 
        if (window.location.pathname.includes("issue-details.html")) { 
            window.location.href = "index.html"; 
        } 
    } 
 
    // Handle Issue Submission 
    const issueForm = document.getElementById("issue-form"); 
    if (issueForm) { 
        issueForm.addEventListener("submit", (e) => { 
            e.preventDefault(); 
            alert("Issue submitted successfully!"); 
            issueForm.reset(); 
        }); 
    } 
 
    // Handle login functionality 
    function handleLogin() { 
        const enteredUsername = document.getElementById("username").value.trim(); 
        const enteredPassword = document.getElementById("password").value.trim(); 
 
        const user = storedUsers.find( 
            u => u.username === enteredUsername && u.password === enteredPassword 
        ); 
 
        if (user) { 
            alert("Login successful!"); 
            localStorage.setItem("username", user.username); 
            window.location.href = "index.html"; 
        } else { 
            alert("Incorrect username or password."); 
        } 
    } 
 
    // Handle logout functionality 
    function logout() { 
        localStorage.removeItem("username"); 
        window.location.href = "index.html"; 
    } 
 
    // Handle sign-up functionality 
    function handleSignUp() { 
        const name = document.getElementById("name").value.trim(); 
        const username = document.getElementById("signup-username").value.trim(); 
        const password = document.getElementById("signup-password").value; 
        const confirmPassword = document.getElementById("signup-confirm-password").value; 
        const city = document.getElementById("city").value.trim(); 
        const state = document.getElementById("state").value.trim(); 
        const contact = document.getElementById("contact").value.trim(); 
        const email = document.getElementById("email").value.trim(); 
 
        if (!name || !username || !password || !confirmPassword || !city || !state || !contact || !email) { 
            alert("All fields are required."); 
            return; 
        } 
 
        if (username.includes(" ")) { 
            alert("Username cannot contain spaces."); 
            return; 
        } 
 
        const isUsernameUnique = !storedUsers.some(user => user.username === username); 
        const isContactUnique = !storedUsers.some(user => user.contact === contact); 
        const isEmailUnique = !storedUsers.some(user => user.email === email); 
 
        if (!isUsernameUnique) { 
            alert("Username already taken. Please choose a different username."); 
            return; 
        } 
        if (!isContactUnique) { 
            alert("Contact number already taken. Please enter a different contact number."); 
            return; 
        } 
        if (!isEmailUnique) { 
            alert("Email already taken. Please enter a different email."); 
            return; 
        } 
        if (password !== confirmPassword) { 
            alert("Passwords do not match."); 
            return; 
        } 
 
        const newUser = { name, username, password, city, state, contact, email }; 
        storedUsers.push(newUser); 
        localStorage.setItem("users", JSON.stringify(storedUsers)); 
        localStorage.setItem("username", username); 
 
        alert("Sign-up successful! Please log in."); 
        showLogin(); 
    } 
 
    // Expose functions globally for use in HTML 
    window.handleLogin = handleLogin; 
    window.logout = logout; 
    window.handleSignUp = handleSignUp; 
}); 
