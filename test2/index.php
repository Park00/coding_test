<?php
    $servername = "localhost";
    $username = "root";
    $password = "pwd";
    $dbname = "imc";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname, 3306);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $xml = simplexml_load_file("data.xml") or die("Error: Cannot create object");

    foreach($xml->children() as $books) {
        $name = $books->name;
        $price = $books->price;
        $description = $books->description;
        $calories = $books->calories;

        $sql = "INSERT INTO imc ('name', 'price', 'description', 'calories') VALUES ($name, $price, $description, $calories)";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    $conn->close();
?>