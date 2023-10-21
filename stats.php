<?php session_start();

include_once("includes/db.php");
$outputvalue = "";

if (isset($_POST["plate"]) && isset($_SESSION["name"]) && isset($_SESSION["time"]) && isset($_SESSION["new"]) && isset($_SESSION["updated"]) && isset($_SESSION["total"])) {
    $platename = strtoupper(htmlspecialchars($_POST["plate"]));

    $db = dbConnect();
    $platesStatement = $db->prepare('SELECT * FROM plates');
    $platesStatement->execute();
    $plates = $platesStatement->fetchAll();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
    <title>Statistics - Immatricat</title>
    <link href="vars.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
    <meta name="author" content="MagicTINTIN">
    <meta name="description" content="J'ai aucun problème avec les statistiques. J'arrête quand je veux.">

    <link rel="icon" type="image/x-icon" href="images/favicon.png">

    <meta property="og:title" content="Statistics - Immatricat">
    <meta property="og:description" content="J'ai aucun problème avec les statistiques. J'arrête quand je veux.">

    <meta property="og:image" content="https://etud.insa-toulouse.fr/~serviere/Immatricat/images/favicon.png">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:alt" content="Logo of Immatricat">
</head>

<body>
    <main class="col">
        <h2>Most seen prefixes</h2>
        <div id="prefixusage" class="split">
            <ol id="prefixlist"></ol>
            <div id="prefixgraph"></div>
        </div>
        <div id="letternumberssusage" class="split">
            <div id="letters">
                <h3>Most used letters</h3>
                <ol id="letterslist"></ol>
            </div>
            <div id="numbers">
                <h3>Most used numbers</h3>
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
                <span id="totalplates"></span>
                <span id="totalunique"></span>
                <span id="doubleletters"></span>
                <span id="zerocentral"></span>
            </div>
        </div>
    </main>
    <script src="stats.js"></script>
</body>

</html>