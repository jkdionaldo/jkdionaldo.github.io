
//
$(document).ready(function() {
	$('#fullpage').fullpage({
		'verticalCentered': false,
		'scrollingSpeed': 600,
		'autoScrolling': false,
		'css3': true,
		'navigation': true,
		'navigationPosition': 'right',
	});
});

// wow
$(function()
{
new WOW().init();
$(".rotate").textrotator();
})

// progress bar animationm

document.addEventListener("DOMContentLoaded", function () {
	const progressBars = document.querySelectorAll("#rating2 .progress-bar");
	// Observer options (adjust as needed)
	const options = {
		root: null, // observe within the viewport
		rootMargin: "0px",
		threshold: 0.1 // Trigger when 10% of the element is visible
	};
	// Trigger animation when section comes into view
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				progressBars.forEach(bar => {
					const value = bar.getAttribute("aria-valuenow");
					bar.style.width = value + "%"; // Set width based on data
					bar.classList.add("active");
				});
			}
		});
	}, options);
	// Observe the section containing the progress bars
	observer.observe(document.querySelector("#rating2"));
	// Allow manual animation on click
	progressBars.forEach(bar => {
		bar.addEventListener("click", () => {
			const value = bar.getAttribute("aria-valuenow");
			bar.style.width = value + "%"; // Set width based on data
			bar.classList.add("active");
		});
	});
});