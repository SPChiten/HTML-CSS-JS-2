document.addEventListener("DOMContentLoaded", function () {
    const subjectTabs = document.querySelectorAll(".subject-tab");
    const subjectContents = document.querySelectorAll(".subject-content");

    subjectTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const subjectId = tab.getAttribute("data-subject");
            showSubjectContent(subjectId);
        });
    });

    function showSubjectContent(subjectId) {
        subjectContents.forEach((content) => {
            content.style.display = "none";
        });

        const selectedContent = document.getElementById(`${subjectId}-content`);
        selectedContent.style.display = "block";
    }

    // Arrow navigation event listener
    const scrollContainers = document.querySelectorAll(".scroll-container");
    scrollContainers.forEach((container) => {
        container.addEventListener("click", function (event) {
            const target = event.target;
            if (target.classList.contains("arrow")) {
                const direction = target.classList.contains("left-arrow") ? -1 : 1;
                navigatePages(container, direction);
            }
        });
    });
});

let currentPageIndex = 0;

function navigatePages(container, direction) {
    const scrollWrapper = container.querySelector(".scroll-wrapper");
    const scrollWidth = container.clientWidth;
    const totalPages = scrollWrapper.children.length;

    // Update the current page index based on the direction
    currentPageIndex = (currentPageIndex + direction + totalPages) % totalPages;

    // Calculate the new position based on the updated page index
    const newPosition = -currentPageIndex * scrollWidth;

    // Update the position
    scrollWrapper.style.transition = "transform 0.5s ease";
    scrollWrapper.style.transform = `translateX(${newPosition}px)`;

    // Reset transition after animation completes to enable continuous rotation
    setTimeout(() => {
        scrollWrapper.style.transition = "none";
    }, 500);
}
