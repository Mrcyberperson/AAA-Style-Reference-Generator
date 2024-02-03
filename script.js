// Function to open the popup for adding another author
function openPopup() {
    var popup = document.getElementById("author-popup");
    popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
    var popup = document.getElementById("author-popup");
    popup.style.display = "none";

    // Clear input values in the popup
    document.getElementById("popup-last-name").value = "";
    document.getElementById("popup-first-name").value = "";
}

// Function to add an author from the popup to the main form
function addAuthorFromPopup() {
    var lastName = document.getElementById("popup-last-name").value.trim();
    var firstName = document.getElementById("popup-first-name").value.trim();

    if (lastName && firstName) {
        var authorFields = document.getElementById("author-fields");

        var newAuthorDiv = document.createElement("div");
        newAuthorDiv.className = "author";

        var lastNameLabel = document.createElement("label");
        lastNameLabel.textContent = "Author Last Name:";
        newAuthorDiv.appendChild(lastNameLabel);

        var lastNameInput = document.createElement("input");
        lastNameInput.type = "text";
        lastNameInput.className = "last-name";
        lastNameInput.value = lastName;
        lastNameInput.readOnly = true;
        newAuthorDiv.appendChild(lastNameInput);

        var firstNameLabel = document.createElement("label");
        firstNameLabel.textContent = "Author First Name:";
        newAuthorDiv.appendChild(firstNameLabel);

        var firstNameInput = document.createElement("input");
        firstNameInput.type = "text";
        firstNameInput.className = "first-name";
        firstNameInput.value = firstName;
        firstNameInput.readOnly = true;
        newAuthorDiv.appendChild(firstNameInput);

        authorFields.appendChild(newAuthorDiv);

        closePopup(); // Close the popup after adding the author
    }
}

// Function to add an author to the main form
function addAuthor() {
    var authorFields = document.getElementById("author-fields");

    var newAuthorDiv = document.createElement("div");
    newAuthorDiv.className = "author";

    var lastNameLabel = document.createElement("label");
    lastNameLabel.textContent = "Author Last Name:";
    newAuthorDiv.appendChild(lastNameLabel);

    var lastNameInput = document.createElement("input");
    lastNameInput.type = "text";
    lastNameInput.className = "last-name";
    lastNameInput.placeholder = "Last name";
    newAuthorDiv.appendChild(lastNameInput);

    var firstNameLabel = document.createElement("label");
    firstNameLabel.textContent = "Author First Name:";
    newAuthorDiv.appendChild(firstNameLabel);

    var firstNameInput = document.createElement("input");
    firstNameInput.type = "text";
    firstNameInput.className = "first-name";
    firstNameInput.placeholder = "First name";
    newAuthorDiv.appendChild(firstNameInput);

    authorFields.appendChild(newAuthorDiv);
}

// Function to generate the reference based on user input
function generateReference() {
    var authors = [];
    var authorInputs = document.querySelectorAll(".author");

    // Check if any author information is provided
    if (authorInputs.length === 0) {
        document.getElementById("error-message").innerText = "At least one author is required";
        return;
    }

    authorInputs.forEach(authorInput => {
        var lastName = authorInput.querySelector(".last-name").value.trim();
        var firstName = authorInput.querySelector(".first-name").value.trim();

        if (lastName && firstName) {
            authors.push(lastName + ', ' + firstName.charAt(0) + '.');
        }
    });

    var title = document.getElementById("title").value.trim();
    var journal = document.getElementById("journal").value.trim();
    var volume = document.getElementById("volume").value.trim();
    var issue = document.getElementById("issue").value.trim();
    var pageRange = document.getElementById("page-range").value.trim();
    var year = document.getElementById("year").value.trim();

    // Check if any required field is missing
    if (!title || !journal || !volume || !year) {
        document.getElementById("error-message").innerText = "All fields are required";
        return;
    }

    var reference = '';

    if (authors.length > 0) {
        reference += authors.join(', ');

        if (authors.length > 1) {
            reference += ' & ' + authors[authors.length - 1];
        }

        reference += '. ';
    }

    reference += year + '. ' + title + '. ' + journal + ', ' + volume;

    if (issue) {
        reference += '(' + issue + ')';
    }

    if (pageRange) {
        reference += ': ' + pageRange + '.';
    } else {
        reference += '.';
    }

    document.getElementById("output").innerText = reference;
    document.getElementById("error-message").innerText = "";

    // Show the copy button after generating the reference
    document.getElementById("copy-button").style.display = "inline-block";
}





// Function to reset the form
function resetForm() {
    var authorFields = document.getElementById("author-fields");
    authorFields.innerHTML = '<div class="author"><label for="last-name">Author Last Name:</label><input type="text" class="last-name" placeholder="Last name"><label for="first-name">Author First Name:</label><input type="text" class="first-name" placeholder="First name"></div>';

    document.getElementById("title").value = '';
    document.getElementById("journal").value = '';
    document.getElementById("volume").value = '';
    document.getElementById("issue").value = '';
    document.getElementById("page-range").value = '';
    document.getElementById("year").value = '';
    document.getElementById("output").innerText = '';
    document.getElementById("error-message").innerText = '';
    document.getElementById("copy-button").style.display = 'none';
}

// Function to copy the reference to clipboard
function copyToClipboard() {
    var outputText = document.getElementById("output").innerText;

    if (outputText) {
        navigator.clipboard.writeText(outputText)
            .then(() => alert('Reference copied to clipboard'))
            .catch(err => console.error('Unable to copy to clipboard', err));
    }
}
