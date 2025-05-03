document.addEventListener('DOMContentLoaded', () => {

    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const modalContainer = modal.querySelector('.modal-container');
    const closeModalButton = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTechList = document.getElementById('modal-tech-list');
    const modalLiveLink = document.getElementById('modal-live-link');
    const modalRepoLink = document.getElementById('modal-repo-link');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // --- Simulated Project Data (Replace with Backend Fetch) ---
    const projectsData = [
        {
            id: 1,
            title: "Project 'Corporate Compass'",
            shortDescription: "A full-stack web application for E-Complaint managment.",
            image: "/PortFolio/cc.png", // Replace with your image path
            fullDescription: "Corporate Compass – E-Complaint Management System Corporate Compass is a web-based complaint management system designed to streamline issue reporting and resolution within organizations or between users and service agencies. The platform allows users to log complaints through a user-friendly interface,specifying relevant details and selecting the responsible agency. Submitted complaints are displayed on a centralized portal,enabling assigned agencies to review, manage, and respond efficiently. The system promotes transparency, accountability,  and faster resolution through organized tracking and status updates. Built with scalability in mind, Corporate Compass is ideal                                 for corporate environments,public service platforms, or internal departmental issue management.",
            technologies: ["Python", "Django", "JavaScript", "HTML", "D3.js", "SQLite", "Bootstrape"],
            liveUrl: "#", // Replace with actual URL or keep '#' to hide button
            repoUrl: "https://github.com/shriharimurkute/Corporate-Compass" // Replace
        },
        {
            id: 2,
            title: "Fin : Financial Education",
            shortDescription: "Fin With Purpose.",
            image: "/PortFolio/finance.png", // Replace
            fullDescription: ".",
            technologies: ["HTML", "CSS", "Javascript", "Mysql", "PHP", "VScode"],
            liveUrl: "https://financialeducation.vercel.app/",
            repoUrl: "https://github.com/shriharimurkute/financial-Education" // Replace
        },
        {
            id: 3,
            title: "API 'Nexus'",
            shortDescription: "A RESTful API for managing inventory.",
            image: "images/project3.jpg", // Replace
            fullDescription: "Designed and implemented a secure and scalable RESTful API using Django REST Framework. Features include authentication, authorization, and CRUD operations for inventory items. Includes comprehensive unit and integration tests.",
            technologies: ["Python", "Django", "DRF", "PostgreSQL", "JWT", "Pytest"],
            liveUrl: "#",
            repoUrl: "https://github.com/your-username/api-nexus" // Replace
        },
         {
            id: 4,
            title: "Dashboard 'Trackers'",
            shortDescription: "various Trackers dashboard.",
            image: "p.jpg", // Replace
            fullDescription: "Created an interactive dashboard using React and Chart.js to display real-time application metrics fetched from a backend API. Focused on clear data presentation and responsiveness.",
            technologies: ["React", "JavaScript", "Chart.js", "CSS3", "REST API"],
            liveUrl: "#", // Link to live demo if available
            repoUrl: "https://github.com/your-username/api-nexus" // Link to repo if available
        }
        // Add more projects here following the same structure
    ];

    // --- Render Project Cards ---
    function renderProjects() {
        if (!projectGrid) return;
        projectGrid.innerHTML = ''; // Clear loading placeholder or previous cards

        if (projectsData.length === 0) {
             projectGrid.innerHTML = '<p class="loading-placeholder">No projects found. Add projects via the admin panel.</p>';
            return;
        }

        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            card.dataset.aos = "fade-up"; // Add AOS animation
            card.dataset.projectId = project.id; // Store ID for modal

            // Basic tech icons (replace with more specific ones if needed)
            let techIconsHtml = '';
            // Example: Limit to first few or map specific tech to icons
            project.technologies.slice(0, 4).forEach(tech => {
                 // Simple fallback icons - ideally map tech name to specific Font Awesome class
                 let iconClass = 'fa-cog'; // Default
                 if (tech.toLowerCase().includes('python')) iconClass = 'fa-brands fa-python';
                 if (tech.toLowerCase().includes('javascript') || tech.toLowerCase().includes('react') || tech.toLowerCase().includes('vue')) iconClass = 'fa-brands fa-js-square';
                 if (tech.toLowerCase().includes('django') || tech.toLowerCase().includes('flask')) iconClass = 'fa-solid fa-server'; // Or Python again
                 if (tech.toLowerCase().includes('sql')) iconClass = 'fa-solid fa-database';
                 if (tech.toLowerCase().includes('docker')) iconClass = 'fa-brands fa-docker';

                 techIconsHtml += `<i class="fas ${iconClass}" title="${tech}"></i>`;
            });


            card.innerHTML = `
                <div class="card-image" style="background-image: url('${project.image}');"></div>
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p class="card-short-desc">${project.shortDescription}</p>
                    <div class="card-tech-icons">
                        ${techIconsHtml}
                        ${project.technologies.length > 4 ? '<i class="fas fa-ellipsis-h" title="More technologies"></i>' : ''}
                    </div>
                    <span class="view-details-prompt">View Details <i class="fas fa-arrow-right"></i></span>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }

     // --- Fetch Projects (Placeholder - Replace with actual API call) ---
    async function fetchProjects() {
        // In a real application, you would fetch from your backend API here:
        // try {
        //     const response = await fetch('/api/projects'); // Your API endpoint
        //     if (!response.ok) throw new Error('Network response was not ok');
        //     projectsData = await response.json();
        //     renderProjects();
        // } catch (error) {
        //     console.error("Failed to fetch projects:", error);
        //      projectGrid.innerHTML = '<p class="loading-placeholder">Error loading projects. Please try again later.</p>';
        // }

        // For now, just use the simulated data
        renderProjects();
    }


    // --- Modal Logic ---
    function openModal(project) {
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalImage.alt = project.title + " Screenshot";
        modalDescription.textContent = project.fullDescription;

        modalTechList.innerHTML = ''; // Clear previous tech
        project.technologies.forEach(tech => {
            const li = document.createElement('li');
            li.textContent = tech;
            modalTechList.appendChild(li);
        });

        modalLiveLink.href = project.liveUrl || "#";
        modalRepoLink.href = project.repoUrl || "#";

        // Make visible and animate with GSAP
        modal.classList.add('active');
        gsap.to(modal, { duration: 0.4, opacity: 1, ease: "power2.out" });
        gsap.fromTo(modalContainer,
            { scale: 0.7, opacity: 0 },
            { duration: 0.5, scale: 1, opacity: 1, ease: "back.out(1.7)", delay: 0.1 }
        );
    }

    function closeModal() {
         gsap.to(modalContainer, {
            duration: 0.3,
            scale: 0.7,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.remove('active');
                // Optional: Reset scroll position of modal content if needed
                modalContainer.scrollTop = 0;
            }
        });
        gsap.to(modal, { duration: 0.4, opacity: 0, delay: 0.1, ease: "power2.in"});
    }

    // Event Listeners
    if (projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectId = parseInt(card.dataset.projectId);
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    openModal(project);
                }
            }
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if (modal) {
        // Close modal if clicking on the overlay (outside the content)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

     // Close modal with Escape key
     document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Mobile Menu Toggle ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change hamburger icon to 'X'
             const icon = menuToggle.querySelector('i');
             icon.classList.toggle('fa-bars');
             icon.classList.toggle('fa-times');
        });

        // Close menu when a link is clicked (for single-page apps)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                 if(navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                     const icon = menuToggle.querySelector('i');
                     icon.classList.remove('fa-times');
                     icon.classList.add('fa-bars');
                 }
            });
        });
    }


    // --- Contact Form Placeholder (No actual submission logic) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to a backend service
            // For this example, just show an alert.
             alert('Transmission Sent!');
            contactForm.reset(); // Clear the form
        });
    }

    // --- Initial Load ---
    fetchProjects(); // Load projects when the page loads

}); // End DOMContentLoaded


// Inside the 'DOMContentLoaded' event listener...

    // --- Modify Project Card Click Listener ---
    if (projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const projectId = parseInt(card.dataset.projectId);
                const project = projectsData.find(p => p.id === projectId);
                if (project) {
                    // ** OPTION 1: Keep Modal (Original Code) **
                    // openModal(project);

                    // ** OPTION 2: Simulate Navigation to Detail Page **
                    // Replace this with actual navigation based on your routing setup
                    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''); // Basic slug generation
                    console.log(`Simulating navigation to: /projects/${projectSlug}/`);
                    // window.location.href = `/projects/${projectSlug}/`; // Uncomment when routing is set up

                    // ** Important: If using detail pages, you might remove the modal HTML and JS entirely.**
                }
            }
        });
    }

    // --- Remove or Comment Out Modal JS if not using it ---
    // function openModal(project) { ... }
    // function closeModal() { ... }
    // if (closeModalButton) { ... }
    // if (modal) { ... }
    // document.addEventListener('keydown', (e) => { ... }); // Escape key listener

    // --- Placeholder for Blog Loading (if dynamic) ---
    function fetchBlogPosts() {
        const blogGrid = document.getElementById('blog-grid');
        const loadingPlaceholder = document.getElementById('blog-loading');
        if (loadingPlaceholder) {
            // Simulate loading delay
            setTimeout(() => {
                loadingPlaceholder.style.display = 'none';
                // In reality, you'd fetch blog data here and render cards
                // similar to how projects are rendered.
            }, 1500); // Simulate 1.5 second load
        }
    }

    // --- Call new functions ---
    fetchBlogPosts(); // Call the function to handle blog loading/rendering

// End DOMContentLoaded