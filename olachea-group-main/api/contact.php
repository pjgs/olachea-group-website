<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and get form data
    $firstName = filter_var(trim($_POST["firstName"]), FILTER_SANITIZE_STRING);
    $lastName = filter_var(trim($_POST["lastName"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING);
    $subject = filter_var(trim($_POST["subject"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    // Validate required fields
    if (empty($firstName) || empty($lastName) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Please fill out all required fields.";
        exit;
    }
    
    // Validate name and last name length (3-20 characters)
    if (strlen($firstName) < 3 || strlen($firstName) > 20 || 
        strlen($lastName) < 3 || strlen($lastName) > 20) {
        http_response_code(400);
        echo "Name and last name must be between 3 and 20 characters.";
        exit;
    }
    
    // Validate phone number (8-15 digits)
    if (!empty($phone) && (!preg_match('/^[0-9]{8,15}$/', $phone))) {
        http_response_code(400);
        echo "Please enter a valid phone number (8-15 digits).";
        exit;
    }
    
    // Validate message length (max 1000 characters)
    if (strlen($message) > 1000) {
        http_response_code(400);
        echo "Message cannot exceed 1000 characters.";
        exit;
    }

    // Recipient email address
    $recipient = "info@olacheagroup.com";

    // Email subject
    $email_subject = "New contact form submission from: $firstName $lastName";

    // Email content
    $email_content = "First Name: $firstName\n";
    $email_content .= "Last Name: $lastName\n";
    $email_content .= "Email: $email\n";
    if (!empty($phone)) {
        $email_content .= "Phone: $phone\n";
    }
    $email_content .= "\nSubject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $email_headers = "From: $firstName $lastName <$email>";

    // Send the email
    if (mail($recipient, $email_subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "Thank you! Your message has been sent successfully.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>
