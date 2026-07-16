const decoration = document.getElementById("decoration");
const dj = document.getElementById("dj");
const photo = document.getElementById("photo");
const video = document.getElementById("video");
const flowers = document.getElementById("flowers");
const lighting = document.getElementById("lighting");
const cake = document.getElementById("cake");
const catering = document.getElementById("catering");

const guests = document.getElementById("guests");
const coupon = document.getElementById("coupon");
const eventType = document.getElementById("eventType"); // Added select element
const requestBtn = document.querySelector("button"); // Grabbed the request button

const summary = document.getElementById("summary");

const subtotal = document.getElementById("subtotal");
const discount = document.getElementById("discount");
const tax = document.getElementById("tax");
const total = document.getElementById("total");

// Initially hide the guest input box
guests.style.display = "none";

function calculateTotal(){
    let amount = 0;
    // Start our summary text with the chosen Event Type
    let text = "<strong>Event Type:</strong> " + eventType.value + "<br><br>";
    let servicesSelected = false; 

    function addService(box, name, price){
        if(box.checked){
            amount += price;
            text += "✅ " + name + " - $" + price + "<br>";
            servicesSelected = true;
        }
    }

    addService(decoration, "Basic Decoration", 150);
    addService(dj, "DJ / Sound System", 200);
    addService(photo, "Photography", 300);
    addService(video, "Videography", 400);
    addService(flowers, "Flower Decoration", 120);
    addService(lighting, "Lighting", 180);
    addService(cake, "Cake", 100);

    // Dynamic show/hide of the catering guest input
    if (catering.checked) {
        guests.style.display = "block"; // Show the input
        let guestCount = Number(guests.value);
        if (guestCount > 0) {
            let cateringCost = guestCount * 15;
            amount += cateringCost;
            text += "🍽 Catering (" + guestCount + " Guests) - $" + cateringCost + "<br>";
            servicesSelected = true;
        }
    } else {
        guests.style.display = "none"; // Hide the input
        guests.value = ""; // Clear input if unchecked
    }

    let subTotal = amount;
    let dis = 0;

    if(coupon.value.toUpperCase() == "SAVE10"){
        dis = subTotal * 0.10;
    }

    let afterDiscount = subTotal - dis;
    let taxAmount = afterDiscount * 0.05;
    let grandTotal = afterDiscount + taxAmount;

    subtotal.innerHTML = "$" + subTotal.toFixed(2);
    discount.innerHTML = "-$" + dis.toFixed(2);
    tax.innerHTML = "$" + taxAmount.toFixed(2);
    total.innerHTML = "$" + grandTotal.toFixed(2);

    // If no specific services are ticked, reset the summary
    if(!servicesSelected){
        summary.innerHTML = "No services selected.";
    } else {
        summary.innerHTML = text;
    }
}

// Add event listener to the submit button
requestBtn.addEventListener("click", () => {
    const finalTotal = total.innerText;
    const selectedEvent = eventType.value;
    alert("🎉 Thank you! Your custom quote request for a " + selectedEvent + " totaling " + finalTotal + " has been successfully submitted! We will contact you soon.");
});

// Event Listeners
decoration.addEventListener("change", calculateTotal);
dj.addEventListener("change", calculateTotal);
photo.addEventListener("change", calculateTotal);
video.addEventListener("change", calculateTotal);
flowers.addEventListener("change", calculateTotal);
lighting.addEventListener("change", calculateTotal);
cake.addEventListener("change", calculateTotal);
catering.addEventListener("change", calculateTotal);

eventType.addEventListener("change", calculateTotal); // Recalculate when event type changes
guests.addEventListener("input", calculateTotal);
coupon.addEventListener("input", calculateTotal);

// Run on page load
calculateTotal();