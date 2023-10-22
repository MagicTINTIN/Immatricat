<?php session_start();

if (isset($_POST["gotostats"]))
{
    header("Location: ./");
    exit();
}

include_once("../includes/db.php");
$plates = [];

$db = dbConnect();
$platesStatement = $db->prepare('SELECT * FROM plates');
$platesStatement->execute();
$plates = $platesStatement->fetchAll();

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
    <title>Statistics - Immatricat</title>
    <link href="../vars.css" rel="stylesheet">
    <link href="../styles.css" rel="stylesheet">
    <link href="stats.css" rel="stylesheet">
    <meta name="author" content="MagicTINTIN">
    <meta name="description" content="J'ai aucun problème avec les statistiques. J'arrête quand je veux.">

    <link rel="icon" type="image/x-icon" href="../images/favicon.png">

    <meta property="og:title" content="Statistics - Immatricat">
    <meta property="og:description" content="J'ai aucun problème avec les statistiques. J'arrête quand je veux.">

    <meta property="og:image" content="https://etud.insa-toulouse.fr/~serviere/Immatricat/images/favicon.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="Logo of Immatricat">
</head>

<body>
    <div class="void"></div>
    <section class="col">
        <h2>Most seen prefixes</h2>
        <div id="prefixusage" class="split">
        <h3>All plates</h3>
            <ol id="prefixlist"></ol>
            <h3>Only car plates (no buses/rentend cars)</h3>
            <ol id="prefixcolist"></ol>
        </div>
        <div id="letternumberssusage" class="split">
            <div id="letters">
                <h3>Most used letters - normal: 2.85%</h3>
                <ol id="letterslist"></ol>
            </div>
            <div id="numbers">
                <h3>Most used numbers - normal: 10%</h3>
                <ol id="numberslist"></ol>
            </div>
        </div>
        <div class="split">
            <div>
                <h3>Most seen plates</h3>
                <ol id="nbSeen"></ol>
            </div>
            <div id="variousstats">
                <h3>Various statistics</h3>
                <span id="totalplates"></span><br>
                <span id="totalunique"></span><br>
                <span id="totalbuses"></span><br>
                <span id="zerocentral"></span><br>
                <span id="doubleletter"></span><br>
                <span id="doublenumber"></span><br>
            </div>
        </div>
    </section>
    <div class="void"></div>
    <script>
        const plates = [
            <?php
            foreach ($plates as $key => $value) {
                echo "{name:\"" . $value["plate"] . "\",nbSeen:\"" . $value["nbSeen"] . "\",type:\"" . $value["type"] . "\"},";
            }
            ?>
        ];
    </script>
    <script src="stats.js"></script>
</body>

</html>