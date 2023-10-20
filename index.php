<?php session_start();

if (isset($_POST["newsession"])) {
    $_SESSION["name"] = htmlspecialchars($_SESSION["newsession"]);
    $_SESSION["time"] = time();
    header("Location: ./");
}

if (isset($_POST["end"])) {
    unset($_SESSION["name"], $_SESSION["time"]);
    header("Location: ./");
}

include_once("includes/db.php");
include_once("includes/time.php");
$outputvalue = "";

if (isset($_POST["plate"]) && isset($_SESSION["name"]) && isset($_SESSION["time"])) {
    $platename = htmlspecialchars($_POST["plate"]);

    $db = dbConnect();
    $platesStatement = $db->prepare('SELECT * FROM plates WHERE username = :plate');
    $platesStatement->execute(['plate' => $platename]);
    $plates = $platesStatement->fetchAll();


    $isNewPlate = 1;
    $newplatetype = 0;
    $oldplatetype = 0;
    $nbSeen = 1;
    $time = time();
    if (sizeof($plates) > 0) {
        $isNewPlate = false;
        $oldplatetype = $plates[0]["type"];
        $nbSeen += $plates[0]["nbSeen"];
        $outputvalue += "+ Seen ". getTime((int) $plates[0]["lastSeen"], $time) ." ago<br>";
    } else {
        $outputvalue += "+ NEW <br>";
    }

    if (isset($_POST["sendnplate"])) {
        // do nothing
    } else if (isset($_POST["sendlplate"])) {
        if ($oldplatetype == 7)
            $outputvalue += "-> Rented car<br>";
        $newplatetype = 7;
    } else if (isset($_POST["sendbplate"])) {
        if ($oldplatetype == 5)
            $outputvalue += "-> Bus<br>";
        $newplatetype = 5;
    } else if (isset($_POST["sendpplate"])) {
        if ($oldplatetype == 3)
        {
            $isNewPlate = -1;
            $outputvalue += "ALREADY PARKED<br>";
        }
        else
            $outputvalue += "-> Parked<br>";
        $newplatetype = 3;
    }
    if (!isset($_POST["sendpplate"]) && $oldplatetype == 3) {
        $outputvalue += "-> Not parked<br>";
    }


    if ($isNewPlate == 1) {
        $sqlQuery = 'INSERT INTO plates(session, createdAt, plate, lastSeen, nbSeen, type) VALUES (:usr, :mail, :pw)';

        $insertUser = $db->prepare($sqlQuery);
        $insertUser->execute([
            'usr' => htmlspecialchars($_POST['cauthor']),
            'mail' => htmlspecialchars($_POST['cemail']),
            'pw' => password_hash(htmlspecialchars($_POST['cpassword']), PASSWORD_DEFAULT),
        ]);
        $_SESSION["username"] = htmlspecialchars($_POST['cauthor']);
        $_SESSION["email"] = htmlspecialchars($_POST['cemail']);
    }
    else if ($isNewPlate == 0) {

    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
    <title>Immatricat</title>
    <link href="vars.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
    <meta name="author" content="MagicTINTIN">
    <meta name="description" content="J'ai aucun problème avec les statistiques. J'arrête quand je veux.">

    <link rel="icon" type="image/x-icon" href="images/favicon.png">
</head>

<body>
    <main>
        <?php
        if (!isset($_SESSION["name"]) || !isset($_SESSION["time"])) {
        ?>
            <form id="createsession" method="post">
                <input type="text" id="sessioninput" name="newsession" required maxlength="32" placeholder="pseudo" title="Enter a pseudo for your session">
                <input type="submit" id="sessionsubmit" name="startsession" value="START" />
            </form>
        <?php
        } else {
        ?>
            <form id="plateform" method="post">
                <div id="multibtn">
                    <div class="row">
                        <input type="submit" id="platesubmitn" class="subplate" name="sendnplate" value="NORMAL" />
                        <input type="submit" id="platesubmitb" class="subplate" name="sendbplate" value="BUS" />
                    </div>
                    <div class="row">
                        <input type="submit" id="platesubmitl" class="subplate" name="sendlplate" value="LOCATION" />
                        <input type="submit" id="platesubmitp" class="subplate" name="sendpplate" value="PARKED" />
                    </div>
                </div>
                <input type="text" id="plateinput" name="plate" required pattern="^[A-Za-z]{3}\d{3}$" oldpattern="[a-zA-Z0-9_-]+" minlength="6" maxlength="6" size="6" title="Enter the car plate" placeholder="XXX000" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
            </form>

            <form id="endform" method="post">
                <input type="submit" id="submitend" name="end" value="END SESSION" />
            </form>

            <?php if ($outputvalue != "") {
            ?>
                <div id="output"><?php echo $outputvalue ?></div>
        <?php
            }
        }
        ?>
    </main>
    <script src="script.js"></script>
</body>

</html>