<?php

$dbhost = "us-east.connect.psdb.cloud";
$dbuser = "xv4grxl5pmn4s4f0tn78";
$dbpass = "pscale_pw_RRIRXh8yKKx1uF3r83tWBHx6VXu0Ole06dXdMpycQPN";
$dbname = "users";

$conn =mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
id (!$conn)
{
    die("No hay conexion: ".mysqli_connect_error());
}

$nombre = $_POST[user];
$pass = $_POST[password];

$query = mysqli_query($conn, "SELECT * FROM login WHERE usuario = '".$nombre"' and password = '".$pass"'");
$nr = mysqli_num_rows($query);

if($nr == 1)
{
    echo "Bienvenido" .$nombre;
}
else if ($nr == 0)
{
    echo: "Algun dato es incorrecto";
}
?>