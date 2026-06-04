$(document).ready(function() {
    // --- Initial Dataset (from User Screenshots) ---
    const defaultContacts = [
        { id: 1, firstName: "Alfred", lastName: "Kuhlman", email: "alfred@test.com", phone: "98989898", address: "123 Main Street, Springfield" },
        { id: 2, firstName: "Frederick", lastName: "Jerde", email: "frederick@test.com", phone: "54545454", address: "456 Oak Road, Rivertown" },
        { id: 3, firstName: "Joannie", lastName: "McLaughlin", email: "joannie@test.com", phone: "75757575", address: "789 Pine Avenue, Lakeshore" },
        { id: 4, firstName: "Odie", lastName: "Koss", email: "odie@test.com", phone: "64646464", address: "321 Elm Boulevard, Hill Valley" },
        { id: 5, firstName: "Edna", lastName: "Ondrickka", email: "edna@test.com", phone: "58595858", address: "654 Maple Drive, Greendale" }
    ];

    // --- State Variables ---
    let contacts = [];
    let currentContactId = null;
    let deleteTargetId = null;

    // --- Inline SVG Icons (for clean resolution) ---
    const eyeIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    const editIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
    const deleteIcon = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

    // --- Initialize Application ---
    function init() {
        loadContacts();
        renderContactsTable();
        
        // Setup Event Listeners
        setupEventListeners();
    }

    // --- Load Contacts from LocalStorage or Defaults ---
    function loadContacts() {
        const stored = localStorage.getItem("contacts_data");
        if (stored) {
            contacts = JSON.parse(stored);
        } else {
            contacts = [...defaultContacts];
            saveContacts();
        }
    }

    // --- Save Contacts to LocalStorage ---
    function saveContacts() {
        localStorage.setItem("contacts_data", JSON.stringify(contacts));
    }

    // --- View Transition Helper ---
    function switchView(viewId) {
        // Clear validation classes
        $(".input-wrapper").removeClass("has-error");
        
        // Hide all views, fade in target view
        $(".card-view").hide();
        $(viewId).fadeIn(350);
    }

    // --- Show Toast Notification ---
    function showToast(message) {
        const toast = $("#toast");
        $("#toastMessage").text(message);
        toast.stop(true, true).fadeIn(200).delay(2500).fadeOut(400);
    }

    // --- Render Contacts Table ---
    function renderContactsTable() {
        const tbody = $("#contactsTableBody");
        tbody.empty();

        if (contacts.length === 0) {
            tbody.append(`
                <tr>
                    <td colspan="6" style="text-align: center; color: var(--text-light); padding: 30px;">
                        No contacts available. Click "+ Add New" to add a contact.
                    </td>
                </tr>
            `);
            return;
        }

        contacts.forEach((contact, index) => {
            const tr = $("<tr>");
            
            tr.append(`<td class="col-num">${index + 1}</td>`);
            tr.append(`<td>${escapeHtml(contact.firstName)}</td>`);
            tr.append(`<td>${escapeHtml(contact.lastName)}</td>`);
            tr.append(`<td>${escapeHtml(contact.email)}</td>`);
            tr.append(`<td>${escapeHtml(contact.phone)}</td>`);
            
            const actionsTd = $('<td class="col-actions">');
            const btnGroup = $('<div class="action-buttons-cell">');
            
            const viewBtn = $(`<button class="btn-action-circle btn-action-view" title="View details">${eyeIcon}</button>`);
            viewBtn.click(() => viewContactDetails(contact.id));
            
            const editBtn = $(`<button class="btn-action-circle btn-action-edit" title="Edit contact">${editIcon}</button>`);
            editBtn.click(() => editContactForm(contact.id));
            
            const deleteBtn = $(`<button class="btn-action-circle btn-action-delete" title="Delete contact">${deleteIcon}</button>`);
            deleteBtn.click(() => confirmDeleteContact(contact.id));
            
            btnGroup.append(viewBtn).append(editBtn).append(deleteBtn);
            actionsTd.append(btnGroup);
            tr.append(actionsTd);
            
            tbody.append(tr);
        });
    }

    // --- View Contact Details ---
    function viewContactDetails(id) {
        const contact = contacts.find(c => c.id === id);
        if (!contact) return;

        currentContactId = id;
        
        $("#detailFirstName").text(contact.firstName);
        $("#detailLastName").text(contact.lastName);
        $("#detailEmail").text(contact.email);
        $("#detailPhone").text(contact.phone);
        $("#detailAddress").text(contact.address);

        switchView("#detailsView");
    }

    // --- Open Form for Editing ---
    function editContactForm(id) {
        const contact = contacts.find(c => c.id === id);
        if (!contact) return;

        currentContactId = id;
        
        // Pre-populate form fields
        $("#contactId").val(contact.id);
        $("#firstName").val(contact.firstName);
        $("#lastName").val(contact.lastName);
        $("#email").val(contact.email);
        $("#phone").val(contact.phone);
        $("#address").val(contact.address);
        
        $("#formTitle").text("Edit Contact");
        switchView("#formView");
    }

    // --- Open Form for Adding New ---
    function openNewContactForm() {
        currentContactId = null;
        
        // Reset form fields
        $("#contactId").val("");
        $("#contactForm")[0].reset();
        
        $("#formTitle").text("Add New Contact");
        switchView("#formView");
    }

    // --- Trigger Delete Confirmation Modal ---
    function confirmDeleteContact(id) {
        deleteTargetId = id;
        $("#deleteModal").fadeIn(200);
    }

    // --- Perform actual deletion ---
    function deleteContact() {
        if (deleteTargetId === null) return;
        
        contacts = contacts.filter(c => c.id !== deleteTargetId);
        saveContacts();
        renderContactsTable();
        
        showToast("Contact deleted successfully!");
        
        // If we deleted the contact currently shown in detail view, go back to list
        if (currentContactId === deleteTargetId) {
            switchView("#listView");
        }
        
        $("#deleteModal").fadeOut(150);
        deleteTargetId = null;
    }

    // --- Form validation ---
    function validateForm() {
        let isValid = true;
        
        const firstName = $("#firstName").val().trim();
        const lastName = $("#lastName").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();
        const address = $("#address").val().trim();
        
        // Email pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Phone pattern (7 to 15 characters, allowing space, dashes, plus, brackets)
        const phoneRegex = /^[+0-9\s\-()]{7,15}$/;

        // First Name check
        if (!firstName) {
            $("#firstName").closest(".input-wrapper").addClass("has-error");
            isValid = false;
        } else {
            $("#firstName").closest(".input-wrapper").removeClass("has-error");
        }

        // Last Name check
        if (!lastName) {
            $("#lastName").closest(".input-wrapper").addClass("has-error");
            isValid = false;
        } else {
            $("#lastName").closest(".input-wrapper").removeClass("has-error");
        }

        // Email check
        if (!email || !emailRegex.test(email)) {
            $("#email").closest(".input-wrapper").addClass("has-error");
            isValid = false;
        } else {
            $("#email").closest(".input-wrapper").removeClass("has-error");
        }

        // Phone check
        if (!phone || !phoneRegex.test(phone)) {
            $("#phone").closest(".input-wrapper").addClass("has-error");
            isValid = false;
        } else {
            $("#phone").closest(".input-wrapper").removeClass("has-error");
        }

        // Address check
        if (!address) {
            $("#address").closest(".input-wrapper").addClass("has-error");
            isValid = false;
        } else {
            $("#address").closest(".input-wrapper").removeClass("has-error");
        }

        return isValid;
    }

    // --- Form Submission ---
    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const idVal = $("#contactId").val();
        const firstName = $("#firstName").val().trim();
        const lastName = $("#lastName").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();
        const address = $("#address").val().trim();

        if (idVal) {
            // Edit existing
            const targetId = parseInt(idVal, 10);
            const index = contacts.findIndex(c => c.id === targetId);
            if (index !== -1) {
                contacts[index] = {
                    id: targetId,
                    firstName,
                    lastName,
                    email,
                    phone,
                    address
                };
                showToast("Contact updated successfully!");
            }
        } else {
            // Create new
            const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
            contacts.push({
                id: newId,
                firstName,
                lastName,
                email,
                phone,
                address
            });
            showToast("Contact added successfully!");
        }

        saveContacts();
        renderContactsTable();
        switchView("#listView");
    }

    // --- Setup all event bindings ---
    function setupEventListeners() {
        // "+ Add New" button click
        $("#btnAddNew").click(openNewContactForm);

        // Cancel button in form
        $("#btnCancelForm").click(function() {
            switchView("#listView");
        });

        // Submit form
        $("#contactForm").submit(handleFormSubmit);

        // Edit button in Details view
        $("#btnEditDetail").click(function() {
            if (currentContactId !== null) {
                editContactForm(currentContactId);
            }
        });

        // Delete button in Details view
        $("#btnDeleteDetail").click(function() {
            if (currentContactId !== null) {
                confirmDeleteContact(currentContactId);
            }
        });

        // Cancel button in Details view
        $("#btnCancelDetail").click(function() {
            switchView("#listView");
        });

        // Modal buttons
        $("#btnConfirmDelete").click(deleteContact);
        $("#btnCancelDelete").click(function() {
            $("#deleteModal").fadeOut(150);
            deleteTargetId = null;
        });

        // Close modal when clicking background
        $("#deleteModal").click(function(e) {
            if (e.target === this) {
                $(this).fadeOut(150);
                deleteTargetId = null;
            }
        });

        // Realtime validation feedback on input focusout/keyup
        $("#contactForm input, #contactForm textarea").on("blur keyup", function() {
            const wrapper = $(this).closest(".input-wrapper");
            if (wrapper.hasClass("has-error")) {
                // If it was in error state, revalidate to clear error indicators if user corrected it
                validateForm();
            }
        });
    }

    // --- Helper to escape HTML tags to prevent XSS ---
    function escapeHtml(text) {
        if (!text) return "";
        return text
            .toString()
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Launch initialisation
    init();
});
