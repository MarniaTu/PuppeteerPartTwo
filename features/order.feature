Feature: Order tickets to cinema
    Scenario: 2 tickets successful order
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user clicks on 7th filmdate
        When user clicks on 11.00 filmtime
        When user goes to "https://qamid.tmweb.ru/client/hall.php" page
        When user clicks on row 8 seat 5
        When user clicks on row 8 seat 6
        When user presses order button
        Then user goes to next "https://qamid.tmweb.ru/client/payment.php" page
        Then user sees tickets order confirmation "Вы выбрали билеты:"
        Then user sees Micky mouse film confirmation "На фильм: Микки маус"
    Scenario: One ticket successful order
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user clicks on 5th filmdate
        When user clicks on 17.00 filmtime
        When user goes to "https://qamid.tmweb.ru/client/hall.php" page
        When user clicks on row 10 seat 8
        When user presses order button
        Then user goes to next "https://qamid.tmweb.ru/client/payment.php" page
        Then user sees Gone with the Wind film confirmation "На фильм: Унесенные ветром."
        Then user sees chair confirmation "Ряд/Место: 10/8"
    Scenario: Ticket order failure
        Given user is on "https://qamid.tmweb.ru/client/index.php" page
        When user clicks on 4th filmdate
        When user clicks on 18.00 filmtime
        When user goes to "https://qamid.tmweb.ru/client/hall.php" page
        When user clicks on row 9 seat 3
        Then user cannot choose this seat
