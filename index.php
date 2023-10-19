<?php session_start();



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi" />
    <title>Immatricat</title>

    <link href="styles.css" rel="stylesheet">
    <meta name="author" content="MagicTINTIN">
    <meta name="description" content="J'ai aucun problème avec les statistiques. J'arrête quand je veux.">

    <!-- <link rel="icon" type="image/x-icon" href="images/favicon.png"> -->
</head>

<body>
    <?php
    if (!isset($_SESSION["name"]) || !isset($_SESSION["time"])) {
    ?>

    <?php
    } else {
    ?>
        <form method="post">
        <input type="text" id="plateinput" name="plate" required
                        placeholder="<?php echo $texts[4][$lng] ?>"
                        pattern="^[A-Za-z]{3}\d{3}$" oldpattern="[a-zA-Z0-9_-]+"
                        minlength="6" maxlength="6" size="6" 
                        title="Enter the car plate">
            <input type="submit" id="platesubmit" name="sendplate" value=">" />
        </form>
        <form method="post">
            <input type="submit" id="submitend" name="end" value="END" />
        </form>
    <?php
    }
    ?>
    <script></script>
</body>

</html>